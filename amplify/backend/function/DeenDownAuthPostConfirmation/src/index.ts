import { sanitizeException } from "@deendown/common-layer/exceptions"
import type { Callback } from "aws-lambda"

import type { Event } from "./event"
import { addToGroup, createUser } from "./modules"

export const handler = async (event: Event, callback: Callback) => {
	try {
		await Promise.all([addToGroup(event), createUser(event)])

		return event
	} catch (error) {
		console.error("---------- ERROR: ", error)
		console.error("---------- EVENT: ", JSON.stringify(event, null, 2))

		callback(sanitizeException(error))
	}
}
