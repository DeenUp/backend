import { AppSyncClient } from "@aws-sdk/client-appsync"

import { ENVS } from "../configs"

export default class AppsyncService {
	private readonly appsync: AppSyncClient

	/**
	 * Create a AppsyncService.
	 *
	 * @param {AppSyncClient} appsync - The AppSync client. If not provided, a new client is instantiated with the region specified in the environment variable.
	 */
	constructor(appsync?: AppSyncClient) {
		this.appsync = appsync ?? new AppSyncClient({ region: ENVS.AWS.Region })
	}
}
