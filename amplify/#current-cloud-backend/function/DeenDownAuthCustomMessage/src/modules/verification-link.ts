import type { Event } from "../event"

export default (event: Event) => {
	if (event.triggerSource === "CustomMessage_SignUp") {
		const {
			region,
			userName,
			request: { codeParameter },
			callerContext: { clientId },
		} = event
		const redirectUrl = `${process.env.REDIRECTURL!}/?username=${userName}`
		const resourcePrefix =
			process.env.RESOURCENAME!.split("CustomMessage")[0]
		const hyphenRegions = [
			"us-east-1",
			"us-west-1",
			"us-west-2",
			"ap-southeast-1",
			"ap-southeast-2",
			"ap-northeast-1",
			"eu-west-1",
			"sa-east-1",
		]
		const separator = hyphenRegions.includes(region) ? "-" : "."
		const payload = Buffer.from(
			JSON.stringify({
				userName,
				redirectUrl,
				region,
				clientId,
			}),
		).toString("base64")
		const bucketUrl = `http://${resourcePrefix}verificationbucket-${process.env.ENV}.s3-website${separator}${region}.amazonaws.com`
		const url = `${bucketUrl}/?data=${payload}&code=${codeParameter}`
		const message = `${process.env.EMAILMESSAGE}. \n ${url}`

		event.response.smsMessage = message
		event.response.emailSubject = process.env.EMAILSUBJECT!
		event.response.emailMessage = message
	}

	return event
}
