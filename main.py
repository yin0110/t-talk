from tkinter.font import names
from unicodedata import name
from flask import *
from flask_socketio import SocketIO, emit, join_room, leave_room, send, Namespace
from namespace import user_namespace
# from room import contact_room
from datetime import datetime, date
from index_page_Handle import index_handler
from member_chatroom_info import chatroom_info
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
app.register_blueprint(index_handler)
app.register_blueprint(chatroom_info)


def handle_time():
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    return current_time


@ app.route("/")
def index():
    return render_template("login.html")


@ app.route("/chatroom")
def chat_room():
    return render_template("chatroom.html")


# @ socketio.on('message')
# def handle_message(data):
#     socketio.emit("send", 'received message: ' + data)


@ socketio.on('my-event', namespace='/test')
def handle_my_custom_namespace_event(json):
    print('received json: ' + str(json))
    emit("my_response", "123")


# @ socketio.on('join')
# def on_join(data):
#     # username = data['username']
#     room = data["room"]
#     print(data)

#     join_room(room)
#     emit("room-message", "abc", to=room)


@ socketio.on("join_room")
def show_room(data):
    room = room(data["username"], data["settingname"], None)
    room.add_message(data["message"])


# set up namespace
# user_namespace.__init__("eee", "yin", "myimg", "/user")
# # print(user_namespace.endpoint)
# user_namespace.add_room(contact_room(
#     0, "Yin Chuang", "/static/img/barysan.png", "user"))
# print(user_namespace)
# print(user_namespace.rooms[0].room_title)
# def __init__(self, room_id, room_title, room_img, namespace, private_room=False):


# @ socketio.on('connection', namespace=user_namespace.endpoint)
# def build_friend_room():
#     room_title = user_namespace.rooms[0].room_title
#     room_img = user_namespace.rooms[0].room_img
#     room_namespace = user_namespace.rooms[0].namespace
#     room_history = []
#     rooms_info = [room_title, room_img,
#                   room_namespace, room_history]
#     emit("build_rooms", rooms_info)


@socketio.on("connect_to_ns")
def handle_chat_NS(room_info):
    global chat_room_id
    chat_room_id = room_info["roomID"]
    room_friend_img = room_info["roomFriendImg"]
    room_user_img = room_info["roomUserImg"]

    @socketio.on("message", namespace="/talk")
    def send_back_data(message):
        if message == "empty":
            pass
        else:
            typing_user = message["user"]
            message_content = message["message"]
            current_time = handle_time()
            join_room(chat_room_id)
            user_info_for_room = {"message": message_content,
                                  "time": current_time, "typing_user": typing_user, "img": room_friend_img, "user_Img": room_user_img}
            emit("full_message", user_info_for_room, to=chat_room_id)


# @socketio.on("message", namespace=chat_room_ns)
# def handle_message(message):
#     if message == "empty":
#         pass
#     else:
#         typing_user = message["user"]
#         message_content = message["message"]
#         current_time = handle_time()
#         join_room(1)
#         emit("room-message", "ooo",
#              to=1)


# @socketio.on("messagevvvv", namespace="/ooo")
# def handle_message(message):
#     if message == "empty":
#         pass
#     else:
#         chat_room = "kkk"
#         # join_room(chat_room)
#         # current_time = handle_time()
#         # user_info_for_room = [message, current_time]
#     emit("room-message", "iii", to=chat_room)


@ socketio.on("get_friend_info", namespace=user_namespace.endpoint)
def send_friend_info(room_title):
    # 查資料庫
    # print(room_title)
    chatroom_data = {
        "friend_name": "Yin Chuang",
        "friend_img": user_namespace.rooms[0].room_img,
        "history": "none"

    }
    emit("chatroom_info", chatroom_data)


if __name__ == '__main__':
    socketio.run(app, port=3000, debug=True)
