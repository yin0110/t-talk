from flask import *
from index_page_handle_modle import member, check_token
from db_history import history


index_handler = Blueprint("index_handler", __name__)


@index_handler.route("/api/usr", methods=["POST"])
def handle_member_post():
    return member.store_member()


@index_handler.route("/api/usr", methods=["PATCH"])
def handle_member_patch():
    return member.get_member()


@index_handler.route("/api/usr", methods=["GET"])
@check_token
def handle_member_get(data):
    return member.handle_token_info(data)


@index_handler.route("/api/usr", methods=["DELETE"])
def handle_mmember_delete():
    return member.sign_out()


@index_handler.route("/api/history/<room_id>", methods=["GET"])
def get_history(room_id):
    return history.load_history(room_id)


@index_handler.route("/api/load_previous_history/<room_id>/<time>", methods=["GET"])
def load_more_previous_history(room_id, time):
    return history.load_previous_history(room_id, time)


@index_handler.route("/api/chatlist_info/<room_id>", methods=["GET"])
def load_chatlist_info(room_id):
    return history.load_friend_list_history(room_id)
