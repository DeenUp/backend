/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "ca-central-1",
    "aws_cloud_logic_custom": [
        {
            "name": "AdminQueries",
            "endpoint": "https://kgcs2epctj.execute-api.ca-central-1.amazonaws.com/dev",
            "region": "ca-central-1"
        }
    ],
    "aws_appsync_graphqlEndpoint": "https://v3wqp7einnfnxahafz2uiub5gu.appsync-api.ca-central-1.amazonaws.com/graphql",
    "aws_appsync_region": "ca-central-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_appsync_apiKey": "da2-o4frvryzencwdeafik5nz22bku",
    "aws_cognito_identity_pool_id": "ca-central-1:d9dd0a89-13cb-42fa-852b-c4325fc26665",
    "aws_cognito_region": "ca-central-1",
    "aws_user_pools_id": "ca-central-1_ll0YdbSLi",
    "aws_user_pools_web_client_id": "716rf66mrl6sdu6gjv5rmj2s2v",
    "oauth": {
        "domain": "deenup-dev.auth.ca-central-1.amazoncognito.com",
        "scope": [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:3000/,myapp://,https://deenup.app/",
        "redirectSignOut": "http://localhost:3000/,myapp://,https://deenup.app/",
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_AND_IDENTITY_POOLS",
    "aws_cognito_username_attributes": [
        "EMAIL",
        "PHONE_NUMBER"
    ],
    "aws_cognito_social_providers": [
        "FACEBOOK",
        "GOOGLE"
    ],
    "aws_cognito_signup_attributes": [
        "EMAIL",
        "NAME"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "SMS",
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": [
            "REQUIRES_LOWERCASE",
            "REQUIRES_UPPERCASE"
        ]
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ]
};


export default awsmobile;
