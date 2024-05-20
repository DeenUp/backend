import { Stripe } from "stripe"

import { SECRETS } from "../configs"
import SSMService from "./ssm-service"

export default class StripeService {
	private readonly ssmService: SSMService
	private stripe!: Stripe

	constructor(ssmService?: SSMService) {
		this.ssmService = ssmService ?? new SSMService()
	}

	async initialize(): Promise<void> {
		const stripeSecret = await this.ssmService.fetchSecret({
			name: SECRETS.STRIPE.SecretKey,
		})

		if (!stripeSecret) {
			throw new Error("Stripe secret not found")
		}

		this.stripe = new Stripe(stripeSecret, {
			apiVersion: "2023-10-16",
			typescript: true,
		})
	}

	webhook(params: WebhookParams): Stripe.Event {
		return this.stripe.webhooks.constructEvent(
			params.payload,
			params.header,
			params.secret,
		)
	}

	async createConnectedAccount(
		params: CreateConnectedAccountParams,
	): Promise<Stripe.Account> {
		const { email, country } = params
		const account = await this.stripe.accounts.create({
			email,
			type: "express",
			country: country!,
			default_currency: country === "US" ? "USD" : "CAD",
			capabilities: {
				card_payments: { requested: country === "US" },
				transfers: { requested: true },
			},
			business_type: "individual",
			business_profile: {
				support_email: email,
				product_description: "Advicer",
			},
			tos_acceptance: {
				service_agreement: "full",
			},
		})

		return account
	}

	async createCheckoutSession(
		params: CreateCheckoutSessionParams,
	): Promise<Stripe.Checkout.Session> {
		const unitAmount = params.amount * 100
		const companyShare = unitAmount * 0.2

		return await this.stripe.checkout.sessions.create({
			mode: params.mode ?? "payment",
			payment_method_types: ["card"],
			line_items: [
				{
					price_data: {
						currency: params.currency ?? "CAD",
						product_data: {
							name: params.name ?? "Generic Advice Fee",
							description: params.description,
						},
						unit_amount: unitAmount,
					},
					quantity: 1,
				},
			],
			payment_intent_data: {
				application_fee_amount: companyShare,
				transfer_data: {
					destination: params.stripeConnectedAccountId,
				},
			},
			automatic_tax: {
				enabled: true,
			},
			customer: params.stripeCustomerId,
			success_url: params.successUrl,
			cancel_url: params.cancelUrl,
			metadata: params.metadata,
		})
	}

	async createCustomer(params: CreateCustomerParams): Promise<string> {
		const customer = await this.stripe.customers.create({
			name: params.name,
			email: params.email,
			metadata: params.metadata,
		})

		return customer.id
	}

	async createLoginLink(
		params: CreateLoginLinkParams,
	): Promise<Stripe.LoginLink> {
		return await this.stripe.accounts.createLoginLink(params.accountId)
	}

	async deleteConnectedAccount(
		params: DeleteConnectedAccountParams,
	): Promise<Stripe.DeletedAccount> {
		return await this.stripe.accounts.del(params.accountId)
	}

	async linkAccount(params: LinkAccountParams): Promise<Stripe.AccountLink> {
		return await this.stripe.accountLinks.create({
			account: params.accountId,
			refresh_url: params.refreshUrl,
			return_url: params.returnUrl,
			type: params.type ?? "account_onboarding",
			collect: "eventually_due",
		})
	}
}

export type CreateConnectedAccountParams = {
	email: string
	refreshUrl: string
	returnUrl: string
	country?: string | null
}

export type CreateCheckoutSessionParams = {
	stripeCustomerId: string
	stripeConnectedAccountId: string
	name: string
	amount: number
	successUrl: string
	cancelUrl: string
	description?: string | undefined
	mode?: Stripe.Checkout.SessionCreateParams.Mode | undefined
	currency?: string | undefined
	metadata?: Stripe.MetadataParam | undefined
}

export type CreateCustomerParams = {
	name: string
	email: string
	metadata?: Stripe.MetadataParam | undefined
}

export type DeleteConnectedAccountParams = {
	accountId: string
}

export type CreateLoginLinkParams = {
	accountId: string
}

export type LinkAccountParams = {
	accountId: string
	refreshUrl: string
	returnUrl: string
	type?: Stripe.AccountLinkCreateParams.Type | null
}

export type WebhookParams = {
	payload: string | Buffer
	header: string | Buffer | string[]
	secret: string
}
