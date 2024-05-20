import { default as fetch, Request } from "node-fetch"

import { ENVS } from "../configs"

export default class GraphQLService {
	async executeOperation(
		params: ExcecuteOperationParams,
	): Promise<Record<string, unknown> | null> {
		const request: Record<string, unknown> = {
			query: params.operation,
		}

		if (params.variables) {
			request.variables = params.variables
		}

		const response = await (
			await fetch(
				new Request(ENVS.DEENDOWN_API.Endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"x-api-key": ENVS.DEENDOWN_API.Key,
					},
					body: JSON.stringify(request),
				}),
			)
		).json()

		if (
			response &&
			typeof response === "object" &&
			Object.keys(response.data).length === 1
		) {
			const queryName = Object.keys(response.data)[0]

			// eslint-disable-next-line security/detect-object-injection
			return response.data[queryName]
		}

		return null
	}
}

export type ExcecuteOperationParams = {
	operation: string
	variables?: Record<string, unknown> | null
}
