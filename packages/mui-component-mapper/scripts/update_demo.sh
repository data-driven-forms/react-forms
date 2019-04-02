#!/usr/bin/bash

body='{"request":{"message":"message","branch":"master"}}'

curl -s -X POST \
 -H "Content-Type: application/json" \
 -H "Accept: application/json" \
 -H "Travis-API-Version: 3" \
 -H "Authorization: token ${TRAVIS_TOKEN_DEMO}" \
 -d "$body" \
https://api.travis-ci.org/repo/data-driven-forms%2Freact-renderer-demo/requests

printf "Demo renderer build was triggered!"
