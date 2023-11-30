#!/bin/bash

# Create .env file and write variables to it from env variable
touch .env
echo "$CUSTOM_BUILD_ENV" >>.env
cat .env
