from flask import *
from datetime import datetime, date
from database import dbRDS
from model.db_history_model import history
from model.history_search_model import elastic_db
import asyncio
import jwt
import pytz
from flask_socketio import SocketIO, emit, join_room


def handle_time():
    tw = pytz.timezone('Asia/Taipei')
    now = datetime.now(tw)
    current_time = now.strftime("%H:%M")
    detail_time = now.strftime("%Y%m%d%H%M%S")
    detail_time = int(detail_time)
    time_info = {"current_time": current_time, "detail_time": detail_time}
    return time_info


class event:
    def join_event(self, room_id):
        room = room_id["roomID"]
        join_room(room)

    def message_event(self, message):
        room = message["roomID"]
        token = request.cookies.get('user_token')
        user_info = jwt.decode(token.encode('UTF-8'),
                               dbRDS["mysecret"], algorithms="HS256")
        typing_user = user_info["user_namespace"]
        room_user_img = user_info["img"]
        message_content = message["message"]
        time_info = handle_time()
        current_time = time_info["current_time"]
        detail_time = time_info["detail_time"]
        user_info_for_room = {"message": message_content,
                              "time": current_time, "typing_user": typing_user, "user_Img": room_user_img}
        join_room(room)
        if message["message"] == "first-connect":
            print("ok")
        else:
            emit("full_message", user_info_for_room, to=room)

        async def store_data():
            history.store_history(
                room, typing_user, detail_time, message_content)
            elastic_db.put_doc(room, typing_user, detail_time, message_content)
        # member.store_rds_history(room, typing_user, detail_time, message_content)
        asyncio.run(store_data())

    def draw_event(self, draw_info):
        room = draw_info["roomDetail"]
        join_room(room)
        emit("showDrawData", draw_info, to=room)

    def erase_event(self, erase_info):
        room = erase_info["roomDetail"]
        join_room(room)
        emit("eraseDrawData", erase_info, to=room)

    def clearDraw_event(self, erase_info):
        room = erase_info["roomDetail"]
        join_room(room)
        emit("clearDrawData", "ok", to=room)

    def type_event(self, type_info):
        room = type_info["roomDetail"]
        flag = type_info["flag"]
        token = request.cookies.get('user_token')
        user_info = jwt.decode(token.encode('UTF-8'),
                               dbRDS["mysecret"], algorithms="HS256")
        typing_user = user_info["name"]
        join_room(room)
        allInfo = {
            "flag": flag,
            "type_user": typing_user
        }
        emit("typingStatus", allInfo, to=room)


event = event()
