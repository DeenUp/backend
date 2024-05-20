import {
	AdminAddUserToGroupCommand,
	AdminConfirmSignUpCommand,
	AdminDisableUserCommand,
	AdminEnableUserCommand,
	AdminGetUserCommand,
	AdminListGroupsForUserCommand,
	AdminRemoveUserFromGroupCommand,
	AdminUserGlobalSignOutCommand,
	CognitoIdentityProviderClient,
	CreateGroupCommand,
	GetGroupCommand,
	ListGroupsCommand,
	ListUsersCommand,
	ListUsersInGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider"

import { ENVS } from "../configs"

export default class CognitoService {
	private readonly cognito: CognitoIdentityProviderClient

	/**
	 * Create a CognitoService.
	 *
	 * @param {CognitoIdentityProviderClient} cognito - The CognitoIdentityProvider client. If not provided, a new client is instantiated with the region specified in the environment variable.
	 */
	constructor(cognito?: CognitoIdentityProviderClient) {
		this.cognito =
			cognito ??
			new CognitoIdentityProviderClient({ region: ENVS.AWS.Region })
	}

	async addUserToGroup(
		Username: string,
		UserPoolId: string,
		GroupName: string,
	) {
		const params = {
			GroupName,
			UserPoolId,
			Username,
		}

		console.log(`Attempting to add ${Username} to ${GroupName}`)

		try {
			await this.cognito.send(new AdminAddUserToGroupCommand(params))
			console.log(`Success adding ${Username} to ${GroupName}`)

			return {
				message: `Success adding ${Username} to ${GroupName}`,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async removeUserFromGroup(
		Username: string,
		UserPoolId: string,
		GroupName: string,
	) {
		const params = {
			GroupName,
			UserPoolId,
			Username,
		}

		console.log(`Attempting to remove ${Username} from ${GroupName}`)

		try {
			await this.cognito.send(new AdminRemoveUserFromGroupCommand(params))
			console.log(`Removed ${Username} from ${GroupName}`)

			return {
				message: `Removed ${Username} from ${GroupName}`,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	// Confirms as an admin without using a confirmation code.
	async confirmUserSignUp(UserPoolId: string, Username: string) {
		const params = {
			UserPoolId,
			Username,
		}

		try {
			await this.cognito.send(new AdminConfirmSignUpCommand(params))
			console.log(`Confirmed ${Username} registration`)

			return {
				message: `Confirmed ${Username} registration`,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async disableUser(UserPoolId: string, Username: string) {
		const params = {
			UserPoolId,
			Username,
		}

		try {
			await this.cognito.send(new AdminDisableUserCommand(params))
			console.log(`Disabled ${Username}`)

			return {
				message: `Disabled ${Username}`,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async enableUser(UserPoolId: string, Username: string) {
		const params = {
			UserPoolId,
			Username,
		}

		try {
			await this.cognito.send(new AdminEnableUserCommand(params))
			console.log(`Enabled ${Username}`)

			return {
				message: `Enabled ${Username}`,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async getUser(UserPoolId: string, Username: string) {
		const params = {
			UserPoolId,
			Username,
		}

		console.log(`Attempting to retrieve information for ${Username}`)

		try {
			const result = await this.cognito.send(
				new AdminGetUserCommand(params),
			)

			return result
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async createGroup(GroupName: string, UserPoolId: string) {
		const params = {
			GroupName,
			UserPoolId,
		}

		console.log(`Attempting to create group ${GroupName}`)

		try {
			await this.cognito.send(new CreateGroupCommand(params))
			console.log(`Created group ${GroupName}`)

			return {
				message: `Created group ${GroupName}`,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async getGroup(GroupName: string, UserPoolId: string) {
		const params = {
			GroupName,
			UserPoolId,
		}

		console.log(`Attempting to retrieve information for group ${GroupName}`)

		try {
			const result = await this.cognito.send(new GetGroupCommand(params))

			return result
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async listUsers(
		UserPoolId: string,
		Limit?: number,
		PaginationToken?: string,
	) {
		console.log("Attempting to list users")

		try {
			const result = await this.cognito.send(
				new ListUsersCommand({
					UserPoolId,
					...(Limit && { Limit }),
					...(PaginationToken && { PaginationToken }),
				}),
			)

			return {
				NextToken: result.PaginationToken,
				Users: result.Users,
				$metadata: result.$metadata,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async listGroups(
		UserPoolId: string,
		Limit?: number,
		PaginationToken?: string,
	) {
		const params = {
			UserPoolId,
			...(Limit && { Limit }),
			...(PaginationToken && { PaginationToken }),
		}

		console.log("Attempting to list groups")

		try {
			const result = await this.cognito.send(
				new ListGroupsCommand(params),
			)

			return result
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async listGroupsForUser(
		UserPoolId: string,
		Username: string,
		Limit?: number,
		NextToken?: string,
	) {
		const params = {
			UserPoolId,
			Username,
			...(Limit && { Limit }),
			...(NextToken && { NextToken }),
		}

		console.log(`Attempting to list groups for ${Username}`)

		try {
			const result = await this.cognito.send(
				new AdminListGroupsForUserCommand(params),
			)
			result.Groups?.forEach((val) => {
				delete val.UserPoolId
				delete val.LastModifiedDate
				delete val.CreationDate
				delete val.Precedence
				delete val.RoleArn
			})

			return result
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async listUsersInGroup(
		UserPoolId: string,
		GroupName: string,
		Limit?: number,
		NextToken?: string,
	) {
		const params = {
			UserPoolId,
			GroupName,
			...(Limit && { Limit }),
			...(NextToken && { NextToken }),
		}

		console.log(`Attempting to list users in group ${GroupName}`)

		try {
			const result = await this.cognito.send(
				new ListUsersInGroupCommand(params),
			)

			return result
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	// Signs out from all devices, as an administrator.
	async signUserOut(UserPoolId: string, Username: string) {
		const params = {
			UserPoolId,
			Username,
		}

		console.log(`Attempting to sign out ${Username}`)

		try {
			await this.cognito.send(new AdminUserGlobalSignOutCommand(params))
			console.log(`Signed out ${Username} from all devices`)

			return {
				message: `Signed out ${Username} from all devices`,
			}
		} catch (err) {
			console.log(err)
			throw err
		}
	}
}
