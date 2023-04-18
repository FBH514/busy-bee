import os
import time

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import Response

from database import Database

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Content-Type", "Authorization"],
)


MAX_AGE = 86400
def set_headers(response: Response) -> None:
    """
    Sets the headers for the response.
    :param response: Response
    :return: None
    """
    response.headers['Cache-Control'] = f"public, max-age={MAX_AGE}"


# /v1/careers
@app.get("/v1/careers")
async def get_careers(response: Response) -> list:
    """
    Returns all the careers in the database.
    :param response: Response
    :return: list
    """
    set_headers(response)
    data = {"careers": []}
    db = Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE"))
    for item in db.select(os.getenv("VIEW_ALL")):
        data["careers"].append({
            "id": item[0],
            "applied": item[1],
            "title": item[2],
            "location": item[3],
            "employer": item[4],
            "description": item[5],
            "url": item[6]
        })
    data['careers'].reverse()
    return data["careers"]


# /v1/careers/remote
@app.get(f"/v1/careers/remote")
def get_remote_percentage(response: Response) -> float:
    """
    Returns the percentage of remote work applications.
    :param response: Response
    :return: float
    """
    set_headers(response)
    db = Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE"))
    return db.select(os.getenv("REMOTE"))[0][0]


# /v1/careers/search/{query}
@app.get("/v1/careers/search/{query}")
async def get_careers_by_query(query: str) -> list:
    """
    Returns all the careers in the database.
    :param query: str
    :return: list
    """
    db = Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE"))
    data = db.select(os.getenv("VIEW_ALL"))
    results = []
    for item in data:
        weight = 0
        if query.lower() in item[3].lower(): weight += 5
        if query.lower() in item[4].lower(): weight += 5
        if query.lower() in item[5].strip().lower(): weight += 2
        results.append({
            "id": item[0],
            "applied": item[1],
            "title": item[2],
            "location": item[3],
            "employer": item[4],
            "description": item[5],
            "url": item[6],
            "weight": weight
        })

    results = [item for item in results if item["weight"] > 0]
    results.sort(key=lambda x: x["weight"], reverse=True)
    return results


# /v1/careers/data/locations
@app.get("/v1/careers/data/locations")
async def get_most_applied_locations(response: Response) -> dict:
    """
    Returns the most applied locations in the database.
    :param response: Response
    :return: dict
    """
    set_headers(response)
    db = Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE"))
    result = db.most_applied_location(os.getenv("MOST_APPLIED_LOCATION"))
    return {"name": result[0][0], "value": result[0][1]}


# /v1/careers
@app.post("/v1/careers")
async def create_career(request: Request) -> dict:
    """
    Creates a new career
    :return: dict
    """
    response = await request.json()
    date = time.strftime("%Y-%m-%d")
    title = response['title']
    location = response['location']
    employer = response['employer']
    description = response['description']
    url = response['url']
    data = {
        'applied': date,
        'title': title,
        'location': location,
        'employer': employer,
        'description': description,
        'url': url
    }
    try:
        db = Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE"))
        db.insert(os.getenv("INSERT_INTO"), data)
        return {'status': "Success!"}
    except Exception as e:
        print(e)
        return {'status': "Failed!"}
