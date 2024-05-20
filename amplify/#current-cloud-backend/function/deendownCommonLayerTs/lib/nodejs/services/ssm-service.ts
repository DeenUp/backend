import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm"

import { ENVS } from "../configs"

/**
 * The parameters for fetching a secret.
 * @type {Object} FetchSecretParams
 * @property {string} name - The name of the secret to fetch.
 */
export type FetchSecretParams = {
	name: string
}

/**
 * Class representing a service to interact with AWS SSM.
 */
export default class SSMService {
	private readonly ssm: SSMClient

	/**
	 * Create an SSMService.
	 *
	 * @param {SSMClient} ssm - The SSM client. If not provided, a new client is instantiated with the region specified in the environment variable.
	 */
	constructor(ssm?: SSMClient) {
		this.ssm = ssm ?? new SSMClient({ region: ENVS.AWS.Region })
	}

	/**
	 * Fetches a secret from SSM.
	 * @async
	 * @function
	 * @name runfetchSecretTask
	 * @param {FetchSecretParams} params - The parameters for fetching the secret.
	 *
	 * @returns {Promise<string | null>} - A promise that resolves when the secret is fetched.
	 */
	async fetchSecret(params: FetchSecretParams): Promise<string | null> {
		const { Parameter } = await this.ssm.send(
			new GetParameterCommand({
				Name: params.name,
				WithDecryption: true,
			}),
		)

		return Parameter?.Value ?? null
	}
}
