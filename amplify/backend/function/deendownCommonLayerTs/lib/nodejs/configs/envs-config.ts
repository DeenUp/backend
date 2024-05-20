export const AWS = {
	Region: process.env.REGION!,
	Env: process.env.ENV!,
}

export const DEENDOWN_API = {
	Endpoint: process.env.API_DEENDOWNAPI_GRAPHQLAPIENDPOINTOUTPUT!,
	Id: process.env.API_DEENDOWNAPI_GRAPHQLAPIIDOUTPUT!,
	Key: process.env.API_DEENDOWNAPI_GRAPHQLAPIKEYOUTPUT!,
}

export const S3_BUCKET = process.env.STORAGE_DEENDOWNSTORAGE_BUCKETNAME!

export const COGNITO_IDS = {
	UserPool: process.env.USERPOOL!,
	Group: process.env.GROUP!,
	Client: process.env.CLIENT!,
}

export const DYNAMODB_TABLES = {
	User: process.env.API_DEENDOWNAPI_USERTABLE_NAME!,
}

export const SES_EMAILS = {
	NoReply: process.env.NO_REPLY_EMAIL!,
	General: process.env.GENERAL_EMAIL!,
	Marketing: process.env.MARKETING_EMAIL!,
	Support: process.env.SUPPORT_EMAIL!,
	Test: process.env.TEST_EMAIL!,
}

export const URLS = {
	Sujud: process.env.DEENUP_URL!,
}
