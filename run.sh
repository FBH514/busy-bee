#!/bin/zsh

cd server || exit
source venv/bin/activate
uvicorn api:app --reload &
cd ../client/src || exit
npm run start