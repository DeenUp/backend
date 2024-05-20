import {
	ModelInit,
	MutableModel,
	PersistentModelConstructor,
} from "@aws-amplify/datastore"
import { initSchema } from "@aws-amplify/datastore"

import { schema } from "./schema"

export enum UserStatus {
	ACTIVE = "ACTIVE",
	SUSPENDED = "SUSPENDED",
}

export enum UserType {
	ADMIN = "ADMIN",
	PLAYER = "PLAYER",
}

type EagerGameRoundModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<GameRound, "id">
	}
	readonly id: string
	readonly index: number
	readonly question: string
	readonly correctAnswer: string
	readonly isComplete: boolean
	readonly submittedAnswers: SubmittedAnswerModel[]
	readonly gameSessionID: string
	readonly gameSession: GameSessionModel
	readonly updatedAt: string
	readonly createdAt: string
}

type LazyGameRoundModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<GameRound, "id">
	}
	readonly id: string
	readonly index: number
	readonly question: string
	readonly correctAnswer: string
	readonly isComplete: boolean
	readonly submittedAnswers: AsyncCollection<SubmittedAnswerModel>
	readonly gameSessionID: string
	readonly gameSession: AsyncItem<GameSessionModel>
	readonly updatedAt: string
	readonly createdAt: string
}

export declare type GameRoundModel = LazyLoading extends LazyLoadingDisabled
	? EagerGameRoundModel
	: LazyGameRoundModel

export declare const GameRoundModel: (new (
	init: ModelInit<GameRoundModel>,
) => GameRoundModel) & {
	copyOf(
		source: GameRoundModel,
		mutator: (
			draft: MutableModel<GameRoundModel>,
		) => MutableModel<GameRoundModel> | void,
	): GameRoundModel
}

type EagerSubmittedAnswerModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<SubmittedAnswer, "id">
	}
	readonly id: string
	readonly answer: string
	readonly isCorrect?: boolean | null
	readonly userID: string
	readonly user: UserModel
	readonly gameRoundID: string
	readonly gameRound: GameRoundModel
	readonly updatedAt: string
	readonly createdAt: string
}

type LazySubmittedAnswerModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<SubmittedAnswer, "id">
	}
	readonly id: string
	readonly answer: string
	readonly isCorrect?: boolean | null
	readonly userID: string
	readonly user: AsyncItem<UserModel>
	readonly gameRoundID: string
	readonly gameRound: AsyncItem<GameRoundModel>
	readonly updatedAt: string
	readonly createdAt: string
}

export declare type SubmittedAnswerModel =
	LazyLoading extends LazyLoadingDisabled
		? EagerSubmittedAnswerModel
		: LazySubmittedAnswerModel

export declare const SubmittedAnswerModel: (new (
	init: ModelInit<SubmittedAnswerModel>,
) => SubmittedAnswerModel) & {
	copyOf(
		source: SubmittedAnswerModel,
		mutator: (
			draft: MutableModel<SubmittedAnswerModel>,
		) => MutableModel<SubmittedAnswerModel> | void,
	): SubmittedAnswerModel
}

type EagerGameSessionModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<GameSession, "id">
	}
	readonly id: string
	readonly lobbyID: string
	readonly lobby: LobbyModel
	readonly rounds: GameRoundModel[]
	readonly updatedAt: string
	readonly createdAt: string
}

type LazyGameSessionModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<GameSession, "id">
	}
	readonly id: string
	readonly lobbyID: string
	readonly lobby: AsyncItem<LobbyModel>
	readonly rounds: AsyncCollection<GameRoundModel>
	readonly updatedAt: string
	readonly createdAt: string
}

export declare type GameSessionModel = LazyLoading extends LazyLoadingDisabled
	? EagerGameSessionModel
	: LazyGameSessionModel

export declare const GameSessionModel: (new (
	init: ModelInit<GameSessionModel>,
) => GameSessionModel) & {
	copyOf(
		source: GameSessionModel,
		mutator: (
			draft: MutableModel<GameSessionModel>,
		) => MutableModel<GameSessionModel> | void,
	): GameSessionModel
}

type EagerLobbyModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<Lobby, "id">
	}
	readonly id: string
	readonly code: string
	readonly isActive: boolean
	readonly participants?: (LobbiesJoinedModel | null)[] | null
	readonly creatorID: string
	readonly creator: UserModel
	readonly gameSessionID?: string | null
	readonly gameSession?: GameSessionModel | null
	readonly updatedAt: string
	readonly createdAt: string
}

type LazyLobbyModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<Lobby, "id">
	}
	readonly id: string
	readonly code: string
	readonly isActive: boolean
	readonly participants: AsyncCollection<LobbiesJoinedModel>
	readonly creatorID: string
	readonly creator: AsyncItem<UserModel>
	readonly gameSessionID?: string | null
	readonly gameSession: AsyncItem<GameSessionModel | undefined>
	readonly updatedAt: string
	readonly createdAt: string
}

export declare type LobbyModel = LazyLoading extends LazyLoadingDisabled
	? EagerLobbyModel
	: LazyLobbyModel

export declare const LobbyModel: (new (
	init: ModelInit<LobbyModel>,
) => LobbyModel) & {
	copyOf(
		source: LobbyModel,
		mutator: (
			draft: MutableModel<LobbyModel>,
		) => MutableModel<LobbyModel> | void,
	): LobbyModel
}

type EagerQuestionModel = {
	readonly [__modelMeta__]: {
		identifier: CustomIdentifier<Question, "text">
		readOnlyFields: "createdAt" | "updatedAt"
	}
	readonly text: string
	readonly answers: Answer[]
	readonly createdAt?: string | null
	readonly updatedAt?: string | null
}

type LazyQuestionModel = {
	readonly [__modelMeta__]: {
		identifier: CustomIdentifier<Question, "text">
		readOnlyFields: "createdAt" | "updatedAt"
	}
	readonly text: string
	readonly answers: Answer[]
	readonly createdAt?: string | null
	readonly updatedAt?: string | null
}

export declare type QuestionModel = LazyLoading extends LazyLoadingDisabled
	? EagerQuestionModel
	: LazyQuestionModel

export declare const QuestionModel: (new (
	init: ModelInit<QuestionModel>,
) => QuestionModel) & {
	copyOf(
		source: QuestionModel,
		mutator: (
			draft: MutableModel<QuestionModel>,
		) => MutableModel<QuestionModel> | void,
	): QuestionModel
}

type EagerUserModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<User, "id">
	}
	readonly id: string
	readonly email: string
	readonly name: string
	readonly selfie?: string | null
	readonly status: UserStatus | keyof typeof UserStatus
	readonly type: UserType | keyof typeof UserType
	readonly createdLobbies?: (LobbyModel | null)[] | null
	readonly joinedLobbies?: (LobbiesJoinedModel | null)[] | null
	readonly submittedAnswers?: (SubmittedAnswerModel | null)[] | null
	readonly updatedAt: string
	readonly createdAt: string
}

type LazyUserModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<User, "id">
	}
	readonly id: string
	readonly email: string
	readonly name: string
	readonly selfie?: string | null
	readonly status: UserStatus | keyof typeof UserStatus
	readonly type: UserType | keyof typeof UserType
	readonly createdLobbies: AsyncCollection<LobbyModel>
	readonly joinedLobbies: AsyncCollection<LobbiesJoinedModel>
	readonly submittedAnswers: AsyncCollection<SubmittedAnswerModel>
	readonly updatedAt: string
	readonly createdAt: string
}

export declare type UserModel = LazyLoading extends LazyLoadingDisabled
	? EagerUserModel
	: LazyUserModel

export declare const UserModel: (new (
	init: ModelInit<UserModel>,
) => UserModel) & {
	copyOf(
		source: UserModel,
		mutator: (
			draft: MutableModel<UserModel>,
		) => MutableModel<UserModel> | void,
	): UserModel
}

type EagerLobbiesJoinedModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<LobbiesJoined, "id">
		readOnlyFields: "createdAt" | "updatedAt"
	}
	readonly id: string
	readonly lobbyId?: string | null
	readonly userId?: string | null
	readonly lobby: LobbyModel
	readonly user: UserModel
	readonly createdAt?: string | null
	readonly updatedAt?: string | null
}

type LazyLobbiesJoinedModel = {
	readonly [__modelMeta__]: {
		identifier: ManagedIdentifier<LobbiesJoined, "id">
		readOnlyFields: "createdAt" | "updatedAt"
	}
	readonly id: string
	readonly lobbyId?: string | null
	readonly userId?: string | null
	readonly lobby: AsyncItem<LobbyModel>
	readonly user: AsyncItem<UserModel>
	readonly createdAt?: string | null
	readonly updatedAt?: string | null
}

export declare type LobbiesJoinedModel = LazyLoading extends LazyLoadingDisabled
	? EagerLobbiesJoinedModel
	: LazyLobbiesJoinedModel

export declare const LobbiesJoinedModel: (new (
	init: ModelInit<LobbiesJoinedModel>,
) => LobbiesJoinedModel) & {
	copyOf(
		source: LobbiesJoinedModel,
		mutator: (
			draft: MutableModel<LobbiesJoinedModel>,
		) => MutableModel<LobbiesJoinedModel> | void,
	): LobbiesJoinedModel
}

type EagerAnswerModel = {
	readonly text: string
	readonly isCorrect: boolean
}

type LazyAnswerModel = {
	readonly text: string
	readonly isCorrect: boolean
}

export declare type AnswerModel = LazyLoading extends LazyLoadingDisabled
	? EagerAnswerModel
	: LazyAnswerModel

export declare const AnswerModel: new (
	init: ModelInit<AnswerModel>,
) => AnswerModel

const {
	GameRound,
	SubmittedAnswer,
	GameSession,
	Lobby,
	Question,
	User,
	LobbiesJoined,
	Answer,
} = initSchema(schema) as {
	GameRound: PersistentModelConstructor<GameRoundModel>
	SubmittedAnswer: PersistentModelConstructor<SubmittedAnswerModel>
	GameSession: PersistentModelConstructor<GameSessionModel>
	Lobby: PersistentModelConstructor<LobbyModel>
	Question: PersistentModelConstructor<QuestionModel>
	User: PersistentModelConstructor<UserModel>
	LobbiesJoined: PersistentModelConstructor<LobbiesJoinedModel>
	Answer: PersistentModelConstructor<AnswerModel>
}

export {
	GameRound,
	SubmittedAnswer,
	GameSession,
	Lobby,
	Question,
	User,
	LobbiesJoined,
}
