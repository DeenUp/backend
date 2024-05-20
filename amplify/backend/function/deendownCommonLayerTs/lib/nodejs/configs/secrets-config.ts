export const STRIPE = {
	SecretKey: process.env.STRIPE_SECRET_KEY!,
	WebhookAccount: process.env.STRIPE_WEBHOOK_ACCOUNT_SECRET_KEY!,
	WebhookConnectedAccount:
		process.env.STRIPE_WEBHOOK_CONNECTED_ACCOUNT_SECRET_KEY!,
}
