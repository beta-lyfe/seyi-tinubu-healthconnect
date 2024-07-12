from pydantic import BaseModel
from typing import Literal
import os

class Env(BaseModel):
    environment: Literal['production', 'development']
    secret_key: str

env = Env(environment=os.getenv('APP_ENV'), secret_key=os.getenv('SECRET_KEY'))
