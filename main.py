from flask import *
from flask_socketio import SocketIO, emit, join_room
from datetime import datetime, date
from index_page_Handle import index_handler
from member_chatroom_info import chatroom_info
from index_page_handle_modle import check_token, member
from database import dbRDS
from db_history import history
from history_search_route import search_handler
from history_search_modle import elastic_db
import asyncio
import jwt
import pytz

# from datetime import timezone
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
app.register_blueprint(index_handler)
app.register_blueprint(chatroom_info)
app.register_blueprint(search_handler)

user_socket_id = {}


def handle_time():
    tw = pytz.timezone('Asia/Taipei')
    now = datetime.now(tw)
    current_time = now.strftime("%H:%M")
    detail_time = now.strftime("%Y%m%d%H%M%S")
    detail_time = int(detail_time)
    time_info = {"current_time": current_time, "detail_time": detail_time}
    return time_info


@ app.route("/")
def index():
    return render_template("login.html")


@ app.route("/chatroom")
def chat_room():
    token = request.cookies.get('user_token')
    if not token:
        return render_template("login.html")
    return render_template("chatroom.html")


@socketio.on("join", namespace="/talk")
def join(room_id):
    room = room_id
    join_room(room)
    # a = request.sid
    # print(a)
    # emit("message", "ok", to=room)


@socketio.on("message", namespace="/talk")
def send_back_data(message):
    room = message["roomID"]
    token = request.cookies.get('user_token')
    user_info = jwt.decode(token.encode('UTF-8'),
                           dbRDS["mysecret"], algorithms="HS256")
    typing_user = user_info["user_namespace"]
    room_user_img = user_info["img"]
    # a = request.sid
    # print("socket"+a)
    join_room(room)
    message_content = message["message"]
    time_info = handle_time()
    current_time = time_info["current_time"]
    detail_time = time_info["detail_time"]
    user_info_for_room = {"message": message_content,
                          "time": current_time, "typing_user": typing_user, "user_Img": room_user_img}
    emit("full_message", user_info_for_room, to=room)
    async def store_data():
        history.store_history(room, typing_user, detail_time, message_content)
        elastic_db.put_doc(room, typing_user, detail_time, message_content)
        # member.store_rds_history(room, typing_user, detail_time, message_content)
    asyncio.run(store_data())
    # history.store_history(room, typing_user, detail_time, message_content)
    # elastic_db.put_doc(room, typing_user, detail_time, message_content)
    # member.store_rds_history(room, typing_user, detail_time, message_content)


@socketio.on("draw", namespace="/talk")
def handle_draw(draw_info):
    room = draw_info["roomDetail"]
    join_room(room)
    emit("showDrawData", draw_info, to=room)


@socketio.on("erase", namespace="/talk")
def handle_draw(erase_info):
    room = erase_info["roomDetail"]
    join_room(room)
    emit("eraseDrawData", erase_info, to=room)


@socketio.on("clearDraw", namespace="/talk")
def handle_draw(erase_info):
    room = erase_info["roomDetail"]
    join_room(room)
    emit("clearDrawData", "ok", to=room)


@socketio.on("typing", namespace="/talk")
def handle_typing(type_info):
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


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=4000, debug=True)
