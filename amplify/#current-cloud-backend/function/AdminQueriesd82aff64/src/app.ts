/* eslint-disable */
/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import express, { Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware"

import { ENVS } from "@deendown/common-layer/configs"
import { CognitoService } from "@deendown/common-layer/services"

const allowedGroup = ENVS.COGNITO_IDS.Group
const userPoolId = ENVS.COGNITO_IDS.UserPool

const cognitoService = new CognitoService()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())
app.use((req: Request, res: Response, next: NextFunction) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept",
	)
	next()
})

const checkGroup = function (req: Request, res: Response, next: NextFunction) {
	if (req.path == "/signUserOut") {
		return next()
	}

	if (typeof allowedGroup === "undefined" || allowedGroup === "NONE") {
		return next()
	}

	if (
		req.apiGateway!.event!.requestContext!.authorizer!.claims[
			"cognito:groups"
		]
	) {
		const groups =
			req.apiGateway!.event!.requestContext!.authorizer!.claims[
				"cognito:groups"
			].split(",")
		if (!(allowedGroup && groups.indexOf(allowedGroup) > -1)) {
			const err: any = new Error(
				`User does not have permissions to perform administrative tasks`,
			)
			next(err)
		}
	} else {
		const err: any = new Error(
			`User does not have permissions to perform administrative tasks`,
		)
		err.statusCode = 403
		next(err)
	}
	next()
}

app.all("*", checkGroup)

app.post(
	"/addUserToGroup",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.username || !req.body.groupname) {
			const err: any = new Error("username and groupname are required")
			err.statusCode = 400
			return next(err)
		}

		try {
			const response = await cognitoService.addUserToGroup(
				req.body.username,
				userPoolId,
				req.body.groupname,
			)
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.post(
	"/removeUserFromGroup",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.username || !req.body.groupname) {
			const err: any = new Error("username and groupname are required")
			err.statusCode = 400
			return next(err)
		}

		try {
			const response = await cognitoService.removeUserFromGroup(
				req.body.username,
				userPoolId,
				req.body.groupname,
			)
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.post(
	"/confirmUserSignUp",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.username) {
			const err: any = new Error("username is required")
			err.statusCode = 400
			return next(err)
		}

		try {
			const response = await cognitoService.confirmUserSignUp(
				userPoolId,
				req.body.username,
			)
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.post(
	"/disableUser",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.username) {
			const err: any = new Error("username is required")
			err.statusCode = 400
			return next(err)
		}

		try {
			const response = await cognitoService.disableUser(
				userPoolId,
				req.body.username,
			)
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.post(
	"/enableUser",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.body.username) {
			const err: any = new Error("username is required")
			err.statusCode = 400
			return next(err)
		}

		try {
			const response = await cognitoService.enableUser(
				userPoolId,
				req.body.username,
			)
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.get("/getUser", async (req: Request, res: Response, next: NextFunction) => {
	if (!req.query.username) {
		const err: any = new Error("username is required")
		err.statusCode = 400
		return next(err)
	}

	try {
		const response = await cognitoService.getUser(
			userPoolId,
			req.query.username as string,
		)
		res.status(200).json(response)
	} catch (err) {
		next(err)
	}
})

app.get(
	"/listUsers",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let response
			if (req.query.token) {
				response = await cognitoService.listUsers(
					userPoolId,
					(req.query.limit as unknown as number) || 25,
					req.query.token as string,
				)
			} else if (req.query.limit) {
				response = await cognitoService.listUsers(
					userPoolId,
					req.query.limit as unknown as number,
				)
			} else {
				response = await cognitoService.listUsers(userPoolId)
			}
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.get(
	"/listGroups",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			let response
			if (req.query.token) {
				response = await cognitoService.listGroups(
					userPoolId,
					(req.query.limit as unknown as number) || 25,
					req.query.token as string,
				)
			} else if (req.query.limit) {
				response = await cognitoService.listGroups(
					userPoolId,
					req.query.limit as unknown as number,
				)
			} else {
				response = await cognitoService.listGroups(userPoolId)
			}
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.get(
	"/listGroupsForUser",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.query.username) {
			const err: any = new Error("username is required")
			err.statusCode = 400
			return next(err)
		}

		try {
			let response
			if (req.query.token) {
				response = await cognitoService.listGroupsForUser(
					userPoolId,
					req.query.username as string,
					(req.query.limit as unknown as number) || 25,
					req.query.token as string,
				)
			} else if (req.query.limit) {
				response = await cognitoService.listGroupsForUser(
					userPoolId,
					req.query.username as string,
					req.query.limit as unknown as number,
				)
			} else {
				response = await cognitoService.listGroupsForUser(
					userPoolId,
					req.query.username as string,
				)
			}
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.get(
	"/listUsersInGroup",
	async (req: Request, res: Response, next: NextFunction) => {
		if (!req.query.groupname) {
			const err: any = new Error("groupname is required")
			err.statusCode = 400
			return next(err)
		}

		try {
			let response
			if (req.query.token) {
				response = await cognitoService.listUsersInGroup(
					userPoolId,
					req.query.groupname as string,
					(req.query.limit as unknown as number) || 25,
					req.query.token as string,
				)
			} else if (req.query.limit) {
				response = await cognitoService.listUsersInGroup(
					userPoolId,
					req.query.groupname as string,
					req.query.limit as unknown as number,
				)
			} else {
				response = await cognitoService.listUsersInGroup(
					userPoolId,
					req.query.groupname as string,
				)
			}
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.post(
	"/signUserOut",
	async (req: Request, res: Response, next: NextFunction) => {
		/**
		 * To prevent rogue actions of users with escalated privilege signing
		 * other users out, we ensure it's the same user making the call
		 * Note that this only impacts actions the user can do in User Pools
		 * such as updating an attribute, not services consuming the JWT
		 */
		if (
			req.body.username !=
				req.apiGateway!.event!.requestContext!.authorizer!.claims
					.username &&
			req.body.username !=
				/[^/]*$/.exec(
					req.apiGateway!.event!.requestContext!.identity!.userArn!,
				)![0]
		) {
			const err: any = new Error("only the user can sign themselves out")
			err.statusCode = 400
			return next(err)
		}

		try {
			const response = await cognitoService.signUserOut(
				userPoolId,
				req.body.username,
			)
			res.status(200).json(response)
		} catch (err) {
			next(err)
		}
	},
)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.error(err.message)
	if (!err.statusCode) err.statusCode = 500
	res.status(err.statusCode).json({ message: err.message }).end()
})

app.listen(3000, () => {
	console.log("App started")
})

export default app
