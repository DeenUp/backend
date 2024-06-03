import { a, type ClientSchema, defineData } from "@aws-amplify/backend"
import { postConfirmation } from "../auth/post-confirmation/resource"

const schema = a
	.schema({
		GameRound: a
			.model({
				index: a.integer(),
				question: a.string(),
				correctAnswer: a.string(),
				isComplete: a.boolean(),
				submittedAnswers: a.hasMany("SubmittedAnswer", "id"),
				gameSessionID: a.id().required(),
				gameSession: a.belongsTo("GameSession", "gameSessionID"),
			})
			.secondaryIndexes((index) => [
				index("gameSessionID").queryField(
					"getGameRoundByGameSessionID",
				),
			])
			.authorization((allow) => [allow.authenticated()]),

		SubmittedAnswer: a
			.model({
				answer: a.string(),
				isCorrect: a.boolean(),
				userID: a.id().required(),
				user: a.belongsTo("User", "userID"),
				gameRoundID: a.id().required(),
				gameRound: a.belongsTo("GameRound", "gameRoundID"),
			})
			.secondaryIndexes((index) => [
				index("userID").queryField("getSubmittedAnswerByUserID"),
				index("gameRoundID").queryField(
					"getSubmittedAnswerByGameRoundID",
				),
			])
			.authorization((allow) => [allow.authenticated()]),

		GameSession: a
			.model({
				lobbyID: a.id().required(),
				lobby: a.belongsTo("Lobby", "lobbyID"),
				rounds: a.hasMany("GameRound", "gameSessionID"),
			})
			.secondaryIndexes((index) => [
				index("lobbyID").queryField("getGameSessionByLobbyID"),
			])
			.authorization((allow) => [allow.authenticated()]),

		Lobby: a
			.model({
				code: a.string(),
				isActive: a.boolean(),
				participants: a.hasMany("User", "lobbyID"),
				creatorID: a.id().required(),
				creator: a.belongsTo("User", "creatorID"),
				gameSessionID: a.id(),
				gameSession: a.hasOne("GameSession", "lobbyID"),
			})
			.secondaryIndexes((index) => [
				index("creatorID"),
				index("code"),
				index("gameSessionID"),
			])
			.authorization((allow) => [allow.authenticated()]),

		Question: a.model({
			text: a.string(),
			answers: a.string().array(),
		}),

		User: a
			.model({
				email: a.email(),
				name: a.string(),
				selfie: a.string(),
				status: a.enum(["ACTIVE", "INACTIVE"]),
				type: a.enum(["PLAYER", "ADMIN"]),
				createdLobbies: a.hasMany("Lobby", "creatorID"),
				joinedLobbies: a.hasMany("Lobby", "participants"),
				submittedAnswers: a.hasMany("SubmittedAnswer", "userID"),
			})
			.secondaryIndexes((index) => [
				index("email").queryField("getUserByEmail"),
			])
			.authorization((allow) => [allow.authenticated()]),
	})
	.authorization((allow) => [allow.resource(postConfirmation)])

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "apiKey",
		apiKeyAuthorizationMode: {
			expiresInDays: 30,
		},
	},
})
