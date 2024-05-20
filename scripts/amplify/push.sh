#!/bin/bash
set -e
IFS='|'

CODEGEN="{\
\"generateCode\":true,\
\"codeLanguage\":\"typescript\",\
\"fileNamePattern\":\"src/graphql/**/*.ts\",\
\"generatedFileName\":\"api\",\
\"generateDocs\":true,\
\"maxDepth\":3\
}"

amplify push --allow-destructive-graphql-schema-updates \
--codegen $CODEGEN \
--yes