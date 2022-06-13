from flask import *
from model.index_page_model import member, check_token


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
