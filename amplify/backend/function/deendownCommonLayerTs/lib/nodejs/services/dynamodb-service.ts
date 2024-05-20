/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import type { AttributeValue, WriteRequest } from "@aws-sdk/client-dynamodb"
import {
	BatchWriteItemCommand,
	DeleteItemCommand,
	DynamoDBClient,
	GetItemCommand,
	PutItemCommand,
	UpdateItemCommand,
} from "@aws-sdk/client-dynamodb"

import { ENVS } from "../configs"
import { marshall, unmarshall } from "../utilities"

/**
 * Parameters for creating an item in a table.
 *
 * @type {Object} CreateItemParams
 * @property {string} tableName - The name of the table in which to create the item.
 * @property {Record<string, any>} item - The item you want to create.
 */
export type CreateItemParams = {
	tableName: string
	item: Record<string, unknown>
}

/**
 * Parameters for batch writing items to a table.
 *
 * @type {Object} BatchWriteParams
 * @property {string} tableName - The name of the table in which to perform batch writes.
 * @property {WriteRequest[]} writeRequests - The write requests to execute.
 */
export type BatchWriteParams = {
	tableName: string
	writeRequests: WriteRequest[]
}

/**
 * Parameters for fetching a single item from a table.
 *
 * @type {Object} GetItemParams
 * @property {string} tableName - The name of the table from which to fetch the item.
 * @property {Record<string, any>} key - The primary key(s) of the item you want to retrieve.
 */
export type GetItemParams = {
	tableName: string
	key: Record<string, unknown>
}

/**
 * Parameters for updating an item in a table.
 *
 * @type {Object} UpdateItemParams
 * @property {string} tableName - The name of the table in which to update the item.
 * @property {Record<string, any>} key - The item you want to update.
 * @property {string} updateExpression - The update expression for the update operation.
 * @property {Record<string, any>} expressionAttributeNames - The expression attribute names used in the update expression.
 * @property {Record<string, any>} expressionAttributeValues - The expression attribute values used in the update expression.
 */
export type UpdateItemParams = {
	tableName: string
	key: Record<string, unknown>
	updateExpression: string
	expressionAttributeNames: Record<string, string>
	expressionAttributeValues: Record<string, unknown>
}

/**
 * Parameters for deleting an item from a table.
 *
 * @type {Object} DeleteItemParams
 * @property {string} tableName - The name of the table from which to delete the item.
 * @property {Record<string, any>} key - The primary key(s) of the item you want to delete.
 */
export type DeleteItemParams = {
	tableName: string
	key: Record<string, unknown>
}

/**
 * Class representing a service to interact with AWS DynamoDB.
 */
export default class DynamoDBService {
	private readonly dynamoDB: DynamoDBClient

	/**
	 * Create a DynamoDBService.
	 *
	 * @param {DynamoDBClient} dynamoDB - The DynamoDB client. If not provided, a new client is instantiated with the region specified in the environment variable.
	 */
	constructor(dynamoDB?: DynamoDBClient) {
		this.dynamoDB =
			dynamoDB ??
			(new DynamoDBClient({ region: ENVS.AWS.Region }) as DynamoDBClient)
	}

	/**
	 * Create an item in a table.
	 *
	 * @param {CreateItemParams} params - Parameters for creating an item.
	 *
	 * @returns {Promise<boolean>} A promise resolving to the created item or null if no item is found.
	 */
	async createItem(params: CreateItemParams): Promise<boolean> {
		const response = await this.dynamoDB.send(
			new PutItemCommand({
				TableName: params.tableName,
				Item: marshall(params.item),
				ReturnValues: "NONE",
			}),
		)

		return response.$metadata.httpStatusCode === 200
	}

	/**
	 * Batch write items to a table.
	 *
	 * @param {BatchWriteParams} params - Parameters for batch writing items.
	 *
	 * @returns {Promise<void>} A promise that resolves when the batch write is complete.
	 */
	async batchWrite(params: BatchWriteParams): Promise<void> {
		const { tableName, writeRequests } = params
		const chunkSize = 25

		if (!writeRequests.length) {
			return
		}

		for (let i = 0; i < writeRequests.length; i += chunkSize) {
			await this.dynamoDB.send(
				new BatchWriteItemCommand({
					RequestItems: {
						[tableName]: writeRequests.slice(i, i + chunkSize),
					},
				}),
			)
		}
	}

	/**
	 * Fetch a single item from a table.
	 *
	 * @param {GetItemParams} params - Parameters for fetching an item.
	 *
	 * @returns {Promise<Record<string, unknown> | null>} The unmarshalled item or null if no item is found.
	 */
	async getItem(
		params: GetItemParams,
	): Promise<Record<string, unknown> | null> {
		const { Item } = await this.dynamoDB.send(
			new GetItemCommand({
				TableName: params.tableName,
				Key: marshall(params.key),
			}),
		)

		if (!Item) {
			return null
		}

		const item = unmarshall(Item)

		if (item.isDeleted) {
			return null
		}

		return item
	}

	/**
	 * Update an item in a table.
	 *
	 * @param {UpdateItemParams} params - Parameters for updating an item.
	 *
	 * @returns {Promise<Record<string, unknown> | null>} The unmarshalled updated item or null if no item is found.
	 */
	async updateItem(
		params: UpdateItemParams,
	): Promise<Record<string, unknown> | null> {
		const { Attributes } = await this.dynamoDB.send(
			new UpdateItemCommand({
				TableName: params.tableName,
				Key: marshall(params.key),
				UpdateExpression: params.updateExpression,
				ExpressionAttributeNames: params.expressionAttributeNames,
				ExpressionAttributeValues: marshall(
					params.expressionAttributeValues,
				),
				ReturnValues: "ALL_NEW",
			}),
		)

		return Attributes !== null ? unmarshall(Attributes!) : null
	}

	/**
	 * Delete an item from a table.
	 *
	 * @param {DeleteItemParams} params - Parameters for deleting an item.
	 *
	 * @returns {Promise<Record<string, unknown> | null>} The unmarshalled deleted item or null if no item is found.
	 */
	async deleteItem(
		params: DeleteItemParams,
	): Promise<Record<string, unknown> | null> {
		const { Attributes } = await this.dynamoDB.send(
			new DeleteItemCommand({
				TableName: params.tableName,
				Key: marshall(params.key),
				ReturnValues: "ALL_OLD",
			}),
		)

		return Attributes !== null ? unmarshall(Attributes!) : null
	}
}

/**
 * A builder class for building DynamoDB WriteRequest objects.
 */
export class WriteRequestBuilder {
	private keys: Record<string, string> = {}
	private items: Record<string, Record<string, AttributeValue>> = {}

	/**
	 * Resets the builder, clearing all previously set keys.
	 *
	 * @returns {WriteRequestBuilder} The updated WriteRequestBuilder instance.
	 */
	reset(): WriteRequestBuilder {
		this.keys = {}
		this.items = {}

		return this
	}

	/**
	 * Sets a key-value pair for the WriteRequest.
	 *
	 * @param {string} key - The key name.
	 * @param {string} value - The key value.
	 *
	 * @returns {WriteRequestBuilder} The updated WriteRequestBuilder instance.
	 */
	setKey(key: string, value: string): WriteRequestBuilder {
		this.keys = Object.assign({}, this.keys, { [key]: value })

		return this
	}

	/**
	 * Sets a id-item pair for the WriteRequest.
	 *
	 * @param {string} id - The id of the item.
	 * @param {string} item - The item.
	 *
	 * @returns {WriteRequestBuilder} The updated WriteRequestBuilder instance.
	 */
	setItem(id: string, item: Record<string, never>): WriteRequestBuilder {
		this.items = Object.assign({}, this.items, { [id]: marshall(item) })

		return this
	}

	/**
	 * Builds a DeleteRequest with the specified keys.
	 *
	 * @throws {Error} Throws an error if no keys have been defined.
	 *
	 * @returns {WriteRequest} The generated DeleteRequest object.
	 */
	buildDeleteRequest(): WriteRequest[] {
		if (Object.keys(this.keys).length === 0) {
			throw Error("No keys have been defined")
		}

		const requests: WriteRequest[] = []

		for (const [key] of Object.entries(this.items)) {
			requests.push({
				DeleteRequest: {
					Key: marshall(key),
				},
			})
		}

		this.reset()

		return requests
	}

	/**
	 * Builds a PutRequest with the specified items.
	 *
	 * @throws {Error} Throws an error if no items have been defined.
	 *
	 * @returns {WriteRequest[]} The generated PutRequest objects.
	 */
	buildPutRequest(): WriteRequest[] {
		if (Object.keys(this.items).length === 0) {
			throw Error("No items have been defined")
		}

		const requests: WriteRequest[] = []

		for (const [, item] of Object.entries(this.items)) {
			requests.push({
				PutRequest: {
					Item: item,
				},
			})
		}

		this.reset()

		return requests
	}
}
