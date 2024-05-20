import type { Event } from "./event"
import { verificationLink } from "./modules"

export const handler = async (event: Event) => {
	await Promise.all([verificationLink(event)])

	return event
}
