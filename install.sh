#!/bin/zsh

cd server || exit
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

cd ../client || exit
npm install