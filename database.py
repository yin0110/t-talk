import mysql.connector.pooling
import mysql.connector
import yaml


dbRDS = yaml.safe_load(open('secret.yaml'))
# pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool",
#                                                    pool_size=10,
#                                                    host=dbRDS["host"],
#                                                    user=dbRDS["user"],
#                                                    password=dbRDS["password"],
#                                                    database=dbRDS["db"])
pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool",
                                                   pool_size=10,
                                                   host=dbRDS["host"],
                                                   user=dbRDS["user"],
                                                   password=dbRDS["password"],
                                                   database=dbRDS["db"],
                                                   port=dbRDS["port"])
