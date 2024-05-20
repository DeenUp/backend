import type { Event } from "./event"

export const handler = async (event: Event): Promise<Event> => {
	await Promise.all([])

	return event
}
