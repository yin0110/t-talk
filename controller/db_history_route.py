from flask import *
from model.db_history_model import history

history_handler = Blueprint("history_handler", __name__)


@history_handler.route("/api/history/<room_id>", methods=["GET"])
def get_history(room_id):
    return history.load_history(room_id)


@history_handler.route("/api/load_previous_history/<room_id>/<time>", methods=["GET"])
def load_more_previous_history(room_id, time):
    return history.load_previous_history(room_id, time)


@history_handler.route("/api/chatlist_info/<room_id>", methods=["GET"])
def load_chatlist_info(room_id):
    return history.load_friend_list_history(room_id)
