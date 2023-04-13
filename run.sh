#!/bin/zsh

cd src || exit
uvicorn api:app --reload &
npm run start