import { ENVS } from "@deendown/common-layer/configs"
import { DynamoDBService } from "@deendown/common-layer/services"
import { API } from "@deendown/common-layer/types"

import type { Event } from "../event"

const _ddbService = new DynamoDBService()

export default async (event: Event) => {
	const {
		request: {
			userAttributes: {
				sub: userId,
				email,
				name,
				"custom:user_type": userType,
			},
		},
	} = event
	const now = new Date().toISOString()
	const user: API.User = {
		__typename: "User",
		id: userId,
		email,
		name,
		status: API.UserStatus.ACTIVE,
		type: userType as API.UserType,
		createdAt: now,
		updatedAt: now,
	}

	await _ddbService.createItem({
		tableName: ENVS.DYNAMODB_TABLES.User,
		item: user,
	})

	return event
}
