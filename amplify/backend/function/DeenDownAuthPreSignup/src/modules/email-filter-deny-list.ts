import type { Event } from "../event"

const domainDenyList: string = process.env.DOMAINDENYLIST!

export default (event: Event): Event => {
	const { email } = event.request.userAttributes

	if (domainDenyList.trim() === "") {
		return event
	}

	const denyList = domainDenyList.split(",").map((d) => d.trim())
	const domain = email.substring(email.indexOf("@") + 1)

	if (denyList.length !== 0) {
		if (denyList.includes(domain)) {
			throw new Error(`Invalid email domain: ${domain}`)
		}
	}

	return event
}
