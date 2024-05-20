import type {
	SendEmailCommandOutput,
	SendTemplatedEmailCommandOutput,
} from "@aws-sdk/client-ses"
import {
	SendEmailCommand,
	SendTemplatedEmailCommand,
	SESClient,
} from "@aws-sdk/client-ses"

import { ENVS } from "../configs"

/**
 * The body of an email.
 * @type EmailBody
 * @property {string} html - The HTML content of the email.
 * @property {string} text - The plain text content of the email.
 *
 */
export type EmailBody = {
	html: string
	text: string
}

/**
 * Parameters for sending a simple email.
 * @type SendEmailParams
 * @property {string} fromEmail - The sender's email address.
 * @property {string} toEmail - The recipient's email address.
 * @property {string} subject - The subject of the email.
 * @property {Object} body - The email body content.
 * @property {string} body.html - The HTML content of the email.
 * @property {string} body.text - The plain text content of the email.
 */
export type SendEmailParams = {
	fromEmail: string
	toEmail: string
	subject: string
	body: EmailBody
}

/**
 * Parameters for sending a templated email.
 * @type SendTemplatedEmailParams
 * @property {string} fromEmail - The sender's email address.
 * @property {string} toEmail - The recipient's email address.
 * @property {string} templateName - The name of the email template.
 * @property {Record<string, any>} templateData - The data to be used in the email template.
 */
export type SendTemplatedEmailParams = {
	fromEmail: string
	toEmail: string
	templateName: string
	templateData: Record<string, unknown>
}

export type { SendEmailCommandOutput, SendTemplatedEmailCommandOutput }

/**
 * Class representing an email service that uses AWS SES to send emails.
 */
export default class SESService {
	private readonly ses: SESClient

	/**
	 * Create an SESService.
	 *
	 * @constructor
	 * @param {SESClient} [ses] - The SES client. If not provided, a new client is instantiated with the region specified in the environment variable.
	 */
	constructor(ses?: SESClient) {
		this.ses = ses ?? new SESClient({ region: ENVS.AWS.Region })
	}

	/**
	 * Sends a simple email.
	 * @async
	 * @function
	 * @name sendEmail
	 * @param {SendEmailParams} params - Parameters for sending the email.
	 *
	 * @returns {Promise<SendEmailCommandOutput>} A promise that resolves to the SES API response.
	 */
	async sendEmail(params: SendEmailParams): Promise<SendEmailCommandOutput> {
		const result: SendEmailCommandOutput = await this.ses.send(
			new SendEmailCommand({
				Source: params.fromEmail,
				Destination: {
					ToAddresses: [params.toEmail],
				},
				Message: {
					Subject: {
						Data: params.subject,
					},
					Body: {
						Html: {
							Charset: "UTF-8",
							Data: params.body.html,
						},
						Text: {
							Charset: "UTF-8",
							Data: params.body.text,
						},
					},
				},
			}),
		)

		return result
	}

	/**
	 * Sends a templated email.
	 *
	 * @async
	 * @function
	 * @name sendTemplatedEmail
	 * @param {SendTemplatedEmailParams} params - Parameters for sending the templated email.
	 *
	 * @returns {Promise<SendTemplatedEmailCommandOutput>} A promise that resolves to the SES API response.
	 */
	async sendTemplatedEmail(
		params: SendTemplatedEmailParams,
	): Promise<SendTemplatedEmailCommandOutput> {
		const result: SendTemplatedEmailCommandOutput = await this.ses.send(
			new SendTemplatedEmailCommand({
				Source: params.fromEmail,
				Destination: {
					ToAddresses: [params.toEmail],
				},
				Template: params.templateName,
				TemplateData: JSON.stringify(params.templateData),
			}),
		)

		return result
	}
}
