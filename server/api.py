import functools
import os
import time

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import Response

from database import Database

load_dotenv()
app: FastAPI = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Content-Type", "Authorization"],
)


def cache(cache_time: int = 60) -> callable:
    """
    Sets caching headers for the response.
    :param cache_time: int, default=60
    :return: callable
    """
    def decorator(function: callable) -> callable:
        @functools.wraps(function)
        def wrapper(*args, **kwargs):
            response = args[0]
            response.headers['Cache-Control'] = f"public, max-age={60 * cache_time}"
            return function(*args, **kwargs)
        return wrapper
    return decorator


CAREER_KEYS: tuple = ("id", "applied", "title", "location", "employer", "description", "url")
def list_of_dicts(iterable: list, keys: tuple = CAREER_KEYS) -> list[dict]:
    """
    Converts a list of tuples into a list of dictionaries.
    :param iterable: iter
    :param keys: list[str]
    :return: list[dict]
    """
    data: list[dict] = []
    for item in iterable:
        new_dict = {keys[_]: item[_] for _ in range(len(keys))}
        data.append(new_dict)
    return data


# GET /v1/careers
@cache(60)
@app.get("/v1/careers")
async def get_careers(response: Response) -> list[dict]:
    """
    Returns all the careers in the database.
    :param response: Response
    :return: list
    """
    with Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE")) as db:
        data: list[dict] = list_of_dicts(db.select(os.getenv("VIEW_ALL")), CAREER_KEYS)
        data.reverse()
        return data


# GET /v1/careers/remote
@cache(1)
@app.get(f"/v1/careers/remote")
def get_remote_percentage(response: Response) -> float:
    """
    Returns the percentage of remote work applications.
    :param response: Response
    :return: float
    """
    with Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE")) as db:
        return db.select(os.getenv("REMOTE"))[0][0]


# GET /v1/careers/search/{query}
@cache(60)
@app.get("/v1/careers/search/{query}")
async def get_careers_by_query(query: str) -> list:
    """
    Returns all the careers in the database.
    :param query: str
    :return: list[dict]
    """

    def set_score(item: dict, query: str) -> int:
        """
        Sets the score for the item.
        :param item: dict
        :param query: str
        :return: dict
        """
        weight: int = 0
        if query.lower() in item['location'].lower(): weight += 5
        if query.lower() in item['employer'].lower(): weight += 5
        if query.lower() in item['description'].strip().lower(): weight += 2
        return weight

    with Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE")) as db:
        data = db.select(os.getenv("VIEW_ALL"))
        data = list_of_dicts(data, CAREER_KEYS)
        for item in data:
            item['weight'] = set_score(item, query)
        data = [item for item in data if item['weight'] > 0]
        data.sort(key=lambda x: x['weight'], reverse=True)
        return data


# GET /v1/careers/data/locations
@cache(1)
@app.get("/v1/careers/data/locations")
async def get_most_applied_locations(response: Response) -> dict:
    """
    Returns the most applied locations in the database.
    :param response: Response
    :return: dict
    """
    with Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE")) as db:
        result = db.select(os.getenv("MOST_APPLIED_LOCATION"))
        return {"name": result[0][0], "value": result[0][1]}


# POST /v1/careers
@app.post("/v1/careers")
async def create_career(request: Request) -> dict:
    """
    Makes a new career entry in the database.
    :param request: Request
    :return: dict
    """
    response: dict = await request.json()

    def data(data: dict) -> dict:
        date = time.strftime("%Y-%m-%d")
        title = response['title']
        location = response['location']
        employer = response['employer']
        description = response['description']
        url = response['url']
        return {
            'applied': date,
            'title': title,
            'location': location,
            'employer': employer,
            'description': description,
            'url': url
        }

    try:
        with Database(os.getenv('DB_NAME'), os.getenv("CREATE_TABLE")) as db:
            db.insert(os.getenv("INSERT_INTO"), data(response))
            return {'status': "Success!"}
    except Exception as e:
        print(e)
        return {'status': "Failed!"}
