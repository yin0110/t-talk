import mysql.connector.pooling
import mysql.connector
import yaml
import firebase_admin
from firebase_admin import credentials, firestore
from elasticsearch import Elasticsearch
# from elasticsearch_dsl import search
# from redis import Redis
import redis
from redis import Redis
import logging

logging.basicConfig(level=logging.INFO)

cred = credentials.Certificate("secret.json")
firebase_admin.initialize_app(cred)

# AWS RDS
dbRDS = yaml.safe_load(open('secret.yaml'))
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


elastic_search.info()


# redis = redis.Redis(host="localhost", port=6379)
# elastic cache
redis = redis.Redis(host=dbRDS["redis_host"], port=6379)


# b = r.get("key")
# print(b)
# r.delete("key")
# if(r.exists("key")):
#     print(r.get("key"))

# r.psetex("keey", 1000, "ok")
# 秒
# r.setex("ok", 10, "no")
# if redis.ping():
#     logging.info("Connected to Redis")
#     print("ok")

# firebase = pyrebase.initialize_app(firebaseConfig)
# db = firebase.database()
# auth = firebase.auth

# email = dbRDS["email"]
# password = dbRDS["password"]

mapping = {
    "mappings": {
        "properties": {
            "room_id": {"type": "integer"},
            "user": {"type": "keyword"},
            "time": {"type": "long"},
            "history": {"type": "text"}
        }
    }
}
# client.indices.create(index="search")
# b = elastic_search.indices.create(index='history', body=mapping)
# print(b)
# a = elastic_search.indices.delete(index="history")
# print(a)

doc_4 = {
    "room_id": 1,
    "user": "/000",
    "time": 20211017,
    "history": "好好喔"
}
# b = elastic_search.index(index='history', body=doc_4)
# print(b)
dsl = {
    'query': {
        "ids": {
            "values": "r_PXGIEBSEIMdYtsvkW7"
        }
        # 'match': {
        #     'history': '烏龍'
        # }
    }
    # "sort": {
    #     "time": {                 # 根據age欄位升序排序
    #         "order": "asc"       # asc升序，desc降序
    #     }
    # }
}

# dsl = {
#     "query": {
#         "bool": {
#             "must": [
#                 {"match": {"room_id":   1}}
#             ],
#             "filter": [
#                 {"range": {"time": {"gte": 20211012}}}
#             ]
#         }
#     },
#     "from": 0,
#     "size": 2
# }


# resp = elastic_search.search(index='search', body=dsl)
# print(json.dumps(resp["hits"]["hits"], indent=2, ensure_ascii=False))
# print("Got %d Hits:" % resp['hits']['total']['value'])
# for hit in resp['hits']['hits']:
#     print("%(user)s %(time)s %(history)s" % hit["_source"])
