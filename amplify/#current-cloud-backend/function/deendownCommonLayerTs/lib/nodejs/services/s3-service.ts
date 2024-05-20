import type {
	GetObjectCommandOutput,
	PutObjectCommandOutput,
} from "@aws-sdk/client-s3"
import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { ENVS } from "../configs"

/**
 * Parameters for getting an object from storage.
 *
 * @type {Object} GetObjectParams
 * @property {string} key - The key or identifier of the object to retrieve.
 */
export type GetObjectParams = {
	key: string
}
/**
 * Parameters for putting an object into storage.
 *
 * @type {Object} PutObjectParams
 * @property {string} key - The key or identifier under which the object will be stored.
 * @property {string} body - The content or body of the object to be stored.
 * @property {Date=} expires - (Optional) The expiration date and time for the object.
 */
export type PutObjectParams = {
	key: string
	body: string
	expires?: Date
}
/**
 * Parameters for generating a signed URL for an object.
 *
 * @type {Object} GetSignedUrlParams
 * @property {string} key - The key or identifier of the object for which to generate the signed URL.
 * @property {number} expiresIn - The expiration time for the signed URL in seconds.
 */
export type GetSignedUrlParams = {
	key: string
	expiresIn: number
}

/**
 * Class representing a service to interact with AWS S3.
 */
export default class S3Service {
	private readonly s3: S3Client

	/**
	 * Create an S3Service.
	 *
	 * @param {S3Client} s3 - The S3 client. If not provided, a new client is instantiated with the region specified in the environment variable.
	 */
	constructor(s3?: S3Client) {
		this.s3 = s3 ?? new S3Client({ region: ENVS.AWS.Region })
	}

	/**
	 * Asynchronously retrieves an object from storage.
	 *
	 * @function
	 * @async
	 * @param {GetObjectParams} params - Parameters for retrieving an object.
	 * @returns {Promise<GetObjectCommandOutput>} A promise resolving to the result of the getObject operation.
	 */
	async getObject(params: GetObjectParams): Promise<GetObjectCommandOutput> {
		return await this.s3.send(
			new GetObjectCommand({
				Bucket: ENVS.S3_BUCKET,
				Key: params.key,
			}),
		)
	}

	/**
	 * Asynchronously stores an object in storage.
	 *
	 * @function
	 * @async
	 * @param {PutObjectParams} params - Parameters for storing an object.
	 * @returns {Promise<PutObjectCommandOutput>} A promise resolving to the result of the putObject operation.
	 */
	async putObject(params: PutObjectParams): Promise<PutObjectCommandOutput> {
		return await this.s3.send(
			new PutObjectCommand({
				Bucket: ENVS.S3_BUCKET,
				Key: params.key,
				Body: params.body,
				Expires: params.expires,
			}),
		)
	}

	/**
	 * Asynchronously generates a signed URL for accessing an object.
	 *
	 * @function
	 * @async
	 * @param {GetSignedUrlParams} params - Parameters for generating a signed URL.
	 * @returns {Promise<string>} A promise resolving to the signed URL.
	 */
	async getSignedUrl(params: GetSignedUrlParams): Promise<string> {
		return await getSignedUrl(
			this.s3,
			new GetObjectCommand({
				Bucket: ENVS.S3_BUCKET,
				Key: params.key,
			}),
			{
				expiresIn: params.expiresIn,
			},
		)
	}
}
