from history_search_modle import elastic_db
from flask import *

search_handler = Blueprint("search_handler", __name__)


@search_handler.route("/api/search/<room_id>/<history>", methods=["GET"])
def load_search(room_id, history):
    return elastic_db.search_keyword(room_id, history)


@search_handler.route("/api/load_search/<room_id>/<time>", methods=["GET"])
def load_related_history(room_id, time):
    return elastic_db.search_related_content(room_id, time)


@search_handler.route("/api/search_load_earlier_data/<room_id>/<time>", methods=["GET"])
def load_earlier_history(room_id, time):
    return elastic_db.search_earlier_data(room_id, time)
