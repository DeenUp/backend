#!/bin/bash
set -e
IFS='|'

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\".next\",\
\"BuildCommand\":\"pnpm build\",\
\"StartCommand\":\"pnpm start\"\
}"

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\",\
\"accessKeyId\":\"${AWS_ACCESS_KEY}\",\
\"secretAccessKey\":\"${AWS_SECRET_ACCESS_KEY}\",\
}"

AMPLIFY="{\
\"projectName\":\"${AMPLIFY_PROJECT_NAME}\",\
\"appId\":\"${AMPLIFY_APP_ID}\",\
\"envName\":\"${AMPLIFY_ENV}\",\
\"defaultEditor\":\"code\"\
}"

FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"

PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

CODEGEN="{\
\"generateCode\":true,\
\"codeLanguage\":\"typescript\",\
\"fileNamePattern\":\"src/graphql/**/*.ts\",\
\"generatedFileName\":\"api\",\
\"generateDocs\":true,\
\"maxDepth\":5\
}"

AUTHCONFIG="{\
\"userPoolId\": \"${AWS_USER_POOLS_ID}\",\
\"webClientId\": \"${AWS_APP_CLIENT_WEB_ID}\",\
\"nativeClientId\": \"${AWS_APP_CLIENT_ID}\",\
\"identityPoolId\": \"${AWS_COGNITO_IDENTITY_POOL_ID}\",\
\"googleAppIdUserPool\": \"${AWS_GOOGLE_CLIENT_ID}\",\
\"googleAppSecretUserPool\": \"${AWS_GOOGLE_CLIENT_SECRET}\"\
}"

CATEGORIES="{\
\"auth\":$AUTHCONFIG\
}"

amplify init \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--categories $CATEGORIES \
--yes