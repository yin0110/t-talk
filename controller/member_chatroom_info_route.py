from flask import *
from model.member_chatroom_info_model import get_user_info, get_friend_namesapce, add_friend, show_friend


chatroom_info = Blueprint("chatroom_info", __name__)


@chatroom_info.route("/api/usr_info", methods=["GET"])
def handle_user_info_get():
    return get_user_info()


@chatroom_info.route("/api/usr_namespace", methods=["GET"])
def handle_user_namespace_get():
    return get_friend_namesapce()


@chatroom_info.route("/api/usr_namespace", methods=["POST"])
def handle_user_namespace_post():
    return add_friend()


@chatroom_info.route("/api/usr_friends", methods=["GET"])
def handle_user_friends_get():
    return show_friend()
