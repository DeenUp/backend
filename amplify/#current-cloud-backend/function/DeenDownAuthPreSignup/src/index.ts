import type { Event } from "./event"
import { emailFilterAllowlist, emailFilterDenylist } from "./modules"

export const handler = async (event: Event): Promise<Event> => {
	await Promise.all([emailFilterAllowlist(event), emailFilterDenylist(event)])

	return event
}
