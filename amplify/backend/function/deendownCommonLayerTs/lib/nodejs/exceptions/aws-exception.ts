import {
	AccessDeniedException,
	ApiKeyLimitExceededException,
	ApiKeyValidityOutOfBoundsException,
	ApiLimitExceededException,
	AppSyncServiceException,
	BadRequestException,
	ConcurrentModificationException,
	GraphQLSchemaException,
	InternalFailureException,
	LimitExceededException,
	NotFoundException,
	UnauthorizedException,
} from "@aws-sdk/client-appsync"
import { CognitoIdentityProviderServiceException } from "@aws-sdk/client-cognito-identity-provider"
import {
	ConditionalCheckFailedException,
	DynamoDBServiceException,
	InternalServerError,
	InvalidEndpointException,
	ItemCollectionSizeLimitExceededException,
	ProvisionedThroughputExceededException,
	RequestLimitExceeded,
	ResourceNotFoundException,
	TransactionConflictException,
} from "@aws-sdk/client-dynamodb"
import {
	InvalidObjectState,
	NoSuchKey,
	S3ServiceException,
} from "@aws-sdk/client-s3"
import {
	AccountSendingPausedException,
	ConfigurationSetDoesNotExistException,
	ConfigurationSetSendingPausedException,
	MailFromDomainNotVerifiedException,
	MessageRejected,
	SESServiceException,
	TemplateDoesNotExistException,
} from "@aws-sdk/client-ses"
import { InvalidKeyId, SSMServiceException } from "@aws-sdk/client-ssm"

function sanitizeException(exception: unknown): Error {
	if (exception instanceof NoSuchKey) {
		return new Error("The specified key does not exist.")
	} else if (exception instanceof AppSyncServiceException) {
		return new Error("An exception occurred in the AppSync service.")
	} else if (exception instanceof CognitoIdentityProviderServiceException) {
		return new Error("An exception occurred in the Cognito service.")
	} else if (exception instanceof DynamoDBServiceException) {
		return new Error("An exception occurred in the DynamoDB service.")
	} else if (exception instanceof S3ServiceException) {
		return new Error("An exception occurred in the S3 service.")
	} else if (exception instanceof SESServiceException) {
		return new Error("An exception occurred in the SES service.")
	} else if (exception instanceof SSMServiceException) {
		return new Error("An exception occurred in the SSM service.")
	} else if (exception instanceof MailFromDomainNotVerifiedException) {
		return new Error("The sender's email domain is not verified.")
	} else if (exception instanceof MessageRejected) {
		return new Error("The email message was rejected.")
	} else if (exception instanceof TemplateDoesNotExistException) {
		return new Error("The email template does not exist.")
	} else if (exception instanceof InvalidKeyId) {
		return new Error("The provided key ID is invalid.")
	} else if (exception instanceof InvalidEndpointException) {
		return new Error("An invalid endpoint was used.")
	} else if (exception instanceof InvalidObjectState) {
		return new Error(
			"The object is in an invalid state for the requested operation.",
		)
	} else if (exception instanceof InternalServerError) {
		return new Error(
			"An internal server exception occurred. Please try your request again.",
		)
	} else if (exception instanceof ConditionalCheckFailedException) {
		return new Error(
			"A condition specified in the operation could not be evaluated.",
		)
	} else if (exception instanceof ItemCollectionSizeLimitExceededException) {
		return new Error(
			"The item collection is too large. This exception is only returned for tables with local secondary indexes.",
		)
	} else if (
		exception instanceof AccountSendingPausedException ||
		exception instanceof ConfigurationSetDoesNotExistException ||
		exception instanceof ConfigurationSetSendingPausedException
	) {
		return new Error(
			"Email sending is paused or the configuration set does not exist.",
		)
	} else if (
		exception instanceof ProvisionedThroughputExceededException ||
		exception instanceof RequestLimitExceeded
	) {
		return new Error(
			"The request exceeded a limit. Please try your request again.",
		)
	} else if (
		exception instanceof ResourceNotFoundException ||
		exception instanceof TransactionConflictException
	) {
		return new Error(
			"The requested resource was not found or a transaction conflict occurred. Please check your request.",
		)
	} else if (exception instanceof AccessDeniedException) {
		return new Error("You are not authorized to perform this operation.")
	} else if (exception instanceof ApiKeyLimitExceededException) {
		return new Error("The API key exceeded a limit.")
	} else if (exception instanceof ApiKeyValidityOutOfBoundsException) {
		return new Error("The API key is not valid.")
	} else if (exception instanceof BadRequestException) {
		return new Error("The request is not valid.")
	} else if (exception instanceof ApiLimitExceededException) {
		return new Error("The request exceeded a limit.")
	} else if (exception instanceof ConcurrentModificationException) {
		return new Error(
			"The request could not be completed due to a conflict with the current state of the resource.",
		)
	} else if (exception instanceof GraphQLSchemaException) {
		return new Error("The GraphQL schema is not valid.")
	} else if (exception instanceof InternalFailureException) {
		return new Error("An internal server error occurred.")
	} else if (exception instanceof NotFoundException) {
		return new Error("The resource was not found.")
	} else if (exception instanceof LimitExceededException) {
		return new Error("The request exceeded a limit.")
	} else if (exception instanceof UnauthorizedException) {
		return new Error("You are not authorized to perform this operation.")
	} else {
		console.error("Unknown error:", exception)

		return new Error("An unknown error occurred.")
	}
}

export default sanitizeException
