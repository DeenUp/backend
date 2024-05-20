import { GraphQLService } from "@deendown/common-layer/services"
import { API, Mutation } from "@deendown/common-layer/types"

import type { Event } from "../event"

const _gqlService = new GraphQLService()

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

	const user: API.CreateUserInput = {
		id: userId,
		email,
		name,
		status: API.UserStatus.ACTIVE,
		type: userType as API.UserType,
	}

	await _gqlService.executeOperation({
		operation: Mutation.createUser,
		variables: { input: user },
	})

	return event
}
