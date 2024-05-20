import { Schema } from "@aws-amplify/datastore"

export const schema: Schema = {
	models: {
		GameRound: {
			name: "GameRound",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				index: {
					name: "index",
					isArray: false,
					type: "Int",
					isRequired: true,
					attributes: [],
				},
				question: {
					name: "question",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				correctAnswer: {
					name: "correctAnswer",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				isComplete: {
					name: "isComplete",
					isArray: false,
					type: "Boolean",
					isRequired: true,
					attributes: [],
				},
				submittedAnswers: {
					name: "submittedAnswers",
					isArray: true,
					type: {
						model: "SubmittedAnswer",
					},
					isRequired: true,
					attributes: [],
					isArrayNullable: false,
					association: {
						connectionType: "HAS_MANY",
						associatedWith: ["gameRound"],
					},
				},
				gameSessionID: {
					name: "gameSessionID",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				gameSession: {
					name: "gameSession",
					isArray: false,
					type: {
						model: "GameSession",
					},
					isRequired: true,
					attributes: [],
					association: {
						connectionType: "BELONGS_TO",
						targetNames: ["gameSessionID"],
					},
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
			},
			syncable: true,
			pluralName: "GameRounds",
			attributes: [
				{
					type: "model",
					properties: {},
				},
				{
					type: "key",
					properties: {
						name: "byGameSession",
						queryField: "getGameRoundByGameSessionID",
						fields: ["gameSessionID"],
					},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "private",
								operations: [
									"create",
									"update",
									"delete",
									"read",
								],
							},
						],
					},
				},
			],
		},
		SubmittedAnswer: {
			name: "SubmittedAnswer",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				answer: {
					name: "answer",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				isCorrect: {
					name: "isCorrect",
					isArray: false,
					type: "Boolean",
					isRequired: false,
					attributes: [],
				},
				userID: {
					name: "userID",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				user: {
					name: "user",
					isArray: false,
					type: {
						model: "User",
					},
					isRequired: true,
					attributes: [],
					association: {
						connectionType: "BELONGS_TO",
						targetNames: ["userID"],
					},
				},
				gameRoundID: {
					name: "gameRoundID",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				gameRound: {
					name: "gameRound",
					isArray: false,
					type: {
						model: "GameRound",
					},
					isRequired: true,
					attributes: [],
					association: {
						connectionType: "BELONGS_TO",
						targetNames: ["gameRoundID"],
					},
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
			},
			syncable: true,
			pluralName: "SubmittedAnswers",
			attributes: [
				{
					type: "model",
					properties: {},
				},
				{
					type: "key",
					properties: {
						name: "byUser",
						queryField: "getSubmittedAnswerByUserID",
						fields: ["userID"],
					},
				},
				{
					type: "key",
					properties: {
						name: "byGameRound",
						queryField: "getSubmittedAnswerByGameRoundID",
						fields: ["gameRoundID"],
					},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "private",
								operations: [
									"create",
									"update",
									"delete",
									"read",
								],
							},
						],
					},
				},
			],
		},
		GameSession: {
			name: "GameSession",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				lobbyID: {
					name: "lobbyID",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				lobby: {
					name: "lobby",
					isArray: false,
					type: {
						model: "Lobby",
					},
					isRequired: true,
					attributes: [],
					association: {
						connectionType: "BELONGS_TO",
						targetNames: ["lobbyID"],
					},
				},
				rounds: {
					name: "rounds",
					isArray: true,
					type: {
						model: "GameRound",
					},
					isRequired: true,
					attributes: [],
					isArrayNullable: false,
					association: {
						connectionType: "HAS_MANY",
						associatedWith: ["gameSession"],
					},
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
			},
			syncable: true,
			pluralName: "GameSessions",
			attributes: [
				{
					type: "model",
					properties: {},
				},
				{
					type: "key",
					properties: {
						name: "byLobby",
						queryField: "getGameSessionByLobbyID",
						fields: ["lobbyID"],
					},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "private",
								operations: [
									"create",
									"update",
									"delete",
									"read",
								],
							},
						],
					},
				},
			],
		},
		Lobby: {
			name: "Lobby",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				code: {
					name: "code",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				isActive: {
					name: "isActive",
					isArray: false,
					type: "Boolean",
					isRequired: true,
					attributes: [],
				},
				participants: {
					name: "participants",
					isArray: true,
					type: {
						model: "LobbiesJoined",
					},
					isRequired: false,
					attributes: [],
					isArrayNullable: true,
					association: {
						connectionType: "HAS_MANY",
						associatedWith: ["lobby"],
					},
				},
				creatorID: {
					name: "creatorID",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				creator: {
					name: "creator",
					isArray: false,
					type: {
						model: "User",
					},
					isRequired: true,
					attributes: [],
					association: {
						connectionType: "BELONGS_TO",
						targetNames: ["creatorID"],
					},
				},
				gameSessionID: {
					name: "gameSessionID",
					isArray: false,
					type: "ID",
					isRequired: false,
					attributes: [],
				},
				gameSession: {
					name: "gameSession",
					isArray: false,
					type: {
						model: "GameSession",
					},
					isRequired: false,
					attributes: [],
					association: {
						connectionType: "HAS_ONE",
						associatedWith: ["id"],
						targetNames: ["gameSessionID"],
					},
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
			},
			syncable: true,
			pluralName: "Lobbies",
			attributes: [
				{
					type: "model",
					properties: {},
				},
				{
					type: "key",
					properties: {
						name: "byCode",
						queryField: "getLobbyByCode",
						fields: ["code"],
					},
				},
				{
					type: "key",
					properties: {
						name: "byCreator",
						queryField: "getLobbyByCreatorID",
						fields: ["creatorID"],
					},
				},
				{
					type: "key",
					properties: {
						name: "byGameSession",
						queryField: "getLobbyByGameSessionID",
						fields: ["gameSessionID"],
					},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "private",
								operations: [
									"create",
									"update",
									"delete",
									"read",
								],
							},
						],
					},
				},
			],
		},
		Question: {
			name: "Question",
			fields: {
				text: {
					name: "text",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				answers: {
					name: "answers",
					isArray: true,
					type: {
						nonModel: "Answer",
					},
					isRequired: true,
					attributes: [],
					isArrayNullable: false,
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
			},
			syncable: true,
			pluralName: "Questions",
			attributes: [
				{
					type: "model",
					properties: {
						queries: {
							get: null,
						},
						mutations: null,
						subscriptions: null,
					},
				},
				{
					type: "key",
					properties: {
						fields: ["text"],
					},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "private",
								operations: [
									"create",
									"update",
									"delete",
									"read",
								],
							},
						],
					},
				},
			],
		},
		User: {
			name: "User",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				email: {
					name: "email",
					isArray: false,
					type: "AWSEmail",
					isRequired: true,
					attributes: [],
				},
				name: {
					name: "name",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				selfie: {
					name: "selfie",
					isArray: false,
					type: "String",
					isRequired: false,
					attributes: [],
				},
				status: {
					name: "status",
					isArray: false,
					type: {
						enum: "UserStatus",
					},
					isRequired: true,
					attributes: [],
				},
				type: {
					name: "type",
					isArray: false,
					type: {
						enum: "UserType",
					},
					isRequired: true,
					attributes: [],
				},
				createdLobbies: {
					name: "createdLobbies",
					isArray: true,
					type: {
						model: "Lobby",
					},
					isRequired: false,
					attributes: [],
					isArrayNullable: true,
					association: {
						connectionType: "HAS_MANY",
						associatedWith: ["creator"],
					},
				},
				joinedLobbies: {
					name: "joinedLobbies",
					isArray: true,
					type: {
						model: "LobbiesJoined",
					},
					isRequired: false,
					attributes: [],
					isArrayNullable: true,
					association: {
						connectionType: "HAS_MANY",
						associatedWith: ["user"],
					},
				},
				submittedAnswers: {
					name: "submittedAnswers",
					isArray: true,
					type: {
						model: "SubmittedAnswer",
					},
					isRequired: false,
					attributes: [],
					isArrayNullable: true,
					association: {
						connectionType: "HAS_MANY",
						associatedWith: ["user"],
					},
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: true,
					attributes: [],
				},
			},
			syncable: true,
			pluralName: "Users",
			attributes: [
				{
					type: "model",
					properties: {
						mutations: {
							create: null,
							update: "updateUser",
							delete: null,
						},
					},
				},
				{
					type: "key",
					properties: {
						name: "byEmail",
						queryField: "getUserByEmail",
						fields: ["email"],
					},
				},
				{
					type: "auth",
					properties: {
						rules: [
							{
								allow: "private",
								operations: [
									"create",
									"update",
									"delete",
									"read",
								],
							},
						],
					},
				},
			],
		},
		LobbiesJoined: {
			name: "LobbiesJoined",
			fields: {
				id: {
					name: "id",
					isArray: false,
					type: "ID",
					isRequired: true,
					attributes: [],
				},
				lobbyId: {
					name: "lobbyId",
					isArray: false,
					type: "ID",
					isRequired: false,
					attributes: [],
				},
				userId: {
					name: "userId",
					isArray: false,
					type: "ID",
					isRequired: false,
					attributes: [],
				},
				lobby: {
					name: "lobby",
					isArray: false,
					type: {
						model: "Lobby",
					},
					isRequired: true,
					attributes: [],
					association: {
						connectionType: "BELONGS_TO",
						targetNames: ["lobbyId"],
					},
				},
				user: {
					name: "user",
					isArray: false,
					type: {
						model: "User",
					},
					isRequired: true,
					attributes: [],
					association: {
						connectionType: "BELONGS_TO",
						targetNames: ["userId"],
					},
				},
				createdAt: {
					name: "createdAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
				updatedAt: {
					name: "updatedAt",
					isArray: false,
					type: "AWSDateTime",
					isRequired: false,
					attributes: [],
					isReadOnly: true,
				},
			},
			syncable: true,
			pluralName: "LobbiesJoineds",
			attributes: [
				{
					type: "model",
					properties: {},
				},
				{
					type: "key",
					properties: {
						name: "byLobby",
						fields: ["lobbyId"],
					},
				},
				{
					type: "key",
					properties: {
						name: "byUser",
						fields: ["userId"],
					},
				},
			],
		},
	},
	enums: {
		UserStatus: {
			name: "UserStatus",
			values: ["ACTIVE", "SUSPENDED"],
		},
		UserType: {
			name: "UserType",
			values: ["ADMIN", "PLAYER"],
		},
	},
	nonModels: {
		Answer: {
			name: "Answer",
			fields: {
				text: {
					name: "text",
					isArray: false,
					type: "String",
					isRequired: true,
					attributes: [],
				},
				isCorrect: {
					name: "isCorrect",
					isArray: false,
					type: "Boolean",
					isRequired: true,
					attributes: [],
				},
			},
		},
	},
	codegenVersion: "3.4.4",
	version: "f9d8c3c87f03ea60893c205c6bf9b79f",
}
