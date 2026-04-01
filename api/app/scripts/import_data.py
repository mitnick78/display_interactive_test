#!/usr/bin/env python3

import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base, engine
from app.models.customer import Customer
from app.models.order import Order


TITLE_MAPPING = {"1": "mme", "2": "m"}
