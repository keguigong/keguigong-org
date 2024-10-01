#!/bin/bash

# Create .env file and write variables to it from env variable
touch .env
printf "$CUSTOM_BUILD_ENV" >>.env
printf "run: cat .env: \n"
cat .env && printf "\n"

# Init runtime
printf "run: corepack enable pnpm" && corepack enable pnpm
printf "run: which pnpm: " && which pnpm
printf "run: pnpm -v: " && pnpm -v
printf "run: pnpm i -g tsx: " && pnpm i -g tsx
