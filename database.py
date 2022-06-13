import mysql.connector.pooling
import mysql.connector
import yaml
import firebase_admin
from firebase_admin import credentials, firestore
from elasticsearch import Elasticsearch
import redis
from redis import Redis
import logging

logging.basicConfig(level=logging.INFO)

cred = credentials.Certificate("secret.json")
firebase_admin.initialize_app(cred)

# AWS RDS
dbRDS = yaml.safe_load(open('secret.yaml'))
# local mysql
# pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool",
#                                                    pool_size=10,
#                                                    host=dbRDS["host"],
#                                                    user=dbRDS["user"],
#                                                    password=dbRDS["password"],
#                                                    database=dbRDS["db"])
pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool",
                                                   pool_size=3,
                                                   host=dbRDS["host"],
                                                   user=dbRDS["user"],
                                                   password=dbRDS["password"],
                                                   database=dbRDS["db"],
                                                   port=dbRDS["port"])


# Firebase
db = firestore.client()

# Elastic search
elastic_search = Elasticsearch(cloud_id=dbRDS["cloud_id"], basic_auth=(
    "elastic", dbRDS["elastic_passowrd"]))


# # local Redis
# redis = redis.Redis(host="localhost", port=6379)

# AWS elasticache
redis = redis.Redis(host=dbRDS["redis_host"], port=6379)
