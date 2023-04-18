#!/bin/zsh

cd server || exit
uvicorn api:app --reload &
cd ../client/src || exit
npm run start