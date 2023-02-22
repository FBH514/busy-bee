import os
import json

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request

from database import Database

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization"],
)

load_dotenv()
db = Database(os.getenv('DB_NAME'))


@app.get("/")
async def root():
    return {"message": "Hello World"}

# /v1/careers
@app.post("/v1/careers")
async def create_career(request: Request) -> dict:
    """
    Creates a new career
    :return: dict
    """
    response = await request.json()
    print(response)
    title = response['title']
    location = response['location']
    employer = response['employer']
    description = response['description']
    url = response['url']
    data = {
        'title': title,
        'location': location,
        'employer': employer,
        'description': description,
        'url': url
    }
    try:
        db.insert(data)
        return {'success': True}
    except Exception as e:
        print(e)
        return {'success': False}
