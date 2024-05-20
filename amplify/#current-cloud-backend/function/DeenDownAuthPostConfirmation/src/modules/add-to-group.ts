import { CognitoService } from "@deendown/common-layer/services"

import type { Event } from "../event"

const _cognitoService = new CognitoService()

export default async (event: Event) => {
	const {
		userPoolId,
		request: {
			userAttributes: { sub: userId, "custom:user_type": userType },
		},
	} = event
	const groupName = userType === "ADMIN" ? "Admins" : "Players"

	await _cognitoService.addUserToGroup(userId, userPoolId, groupName)

	return event
}
