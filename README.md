# DeenDown

This project is organized into three branches:

**production** - Production Environment
**staging** - Staging Environment
**dev** - Development Environment

## Local Development Steps

1. Run amplify init within the root of the repo

### Installation Packages

```shell
# Install dev dependencies
pnpm i
```

## Folder Structure

```text
.husky
  └─ commit hooks
.vscode
  └─ Recommended extensions and settings for VSCode users
amplify
  ├─ backend
  |   ├─ api
  |   |   └─ REST and GraphQL APIs
  |   ├─ auth
  |   |   └─ Cognito Service
  |   ├─ function
  |   |   └─ Lambda Layer & Functions
  |   └─ types
  └─ hooks
      └─ Actions for pre and post amplify actions
src
  └─ Amplify config/export
  └─ Code generated models and types
```

---

## Development Workflow

1. Create a New Branch

    Always create branches from the production branch.

    ```shell
    git checkout production
    git pull origin production
    git checkout -b id-branch-name
    ```

2. Local Development and Testing:

    Develop and mock the feature locally.

3. Merge to Dev Branch:

    Commit changes, switch to the dev branch, and merge the feature branch into dev.

    ```shell
    git add .
    git commit -m "id - commit message"
    git checkout dev
    git pull origin dev
    git merge id-branch-name
    git push
    ```

4. Create Pull Request to Production:

    Create a PR pointing to the production branch for code review.

5. Code Review:

    Another developer reviews the code changes in the PR. The other developer will either approve the code or request changes. If changes are requested, handle those changes in the created branch and ensure to remerge changes to the dev branch. If PR is approved the approver will update the ticket status to "Deploy To Staging"

6. Merge to Staging Branch:

    After passing code review, an admin of the branch merges into the staging branch.

    ```shell
    git checkout staging
    git pull origin staging
    git merge id-branch-name
    git push
    ```

7. Testing:

    Repo Admin will test the new feature, bug fix, improvement, etc... in the staging environment.

8. Staging Approval:

    If testing fails, the tester will update the status back to "In Progress" and the developer goes back to step 3. If testing passes, repo admin will update status to "Deploy To Production."

9. Merge to Production Branch:

    Merge the branch via PR. Any changes to production MUST be done via approved PRs.

    - If your branch is behind production by more than 1 commit, then sync production to your branch before closing the PR via

        ```shell
        git checkout clickup-id-branch-name
        git pull origin production
        git merge production
        ```

        and handle any possible conflicts carefully. and push changes. Once your branch is up to date then close the PR.

## Testing

### API

#### REST API - [amplify/backend/api/AdminQueries](./amplify/backend/api/AdminQueries)

TBD

#### GraphQL API - [amplify/backend/api/DeenDownAPI](./amplify/backend/api/DeenDownAPI)

1. Make sure you are in the main directory of the repo.
2. Check if the schema is vaild:

    ```shell
    amplify api gql-compile
    ```

    If a table was removed or has any breaking changes run the following:

    ```shell
    amplify api gql-compile --allow-destructive-graphql-schema-updates
    ```

    If the command runs successfully continue to the next step, if not fix the issue and repeat step 2.

3. Execute the following command:

    ```shell
    amplify mock api
    ```

    This command will simulate interactions with your GraphQL backend services locally.

    After running the command, you'll receive a URL to test the GraphQL API functionalities.

## Notes

-   Use meaningful commit messages.
-   Collaborate through PRs to maintain code quality and allow for proper code review.
-   Regularly update your local branches to avoid conflicts.

## References

[AWS Amplify](https://aws.amazon.com/amplify/)
