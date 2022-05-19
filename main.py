from flask import *
from flask_socketio import SocketIO, emit, join_room, leave_room, send, Namespace
# from namespace import user_namespace
# from room import contact_room
from datetime import datetime, date

from numpy import broadcast
from sqlalchemy import true
from index_page_Handle import index_handler
from member_chatroom_info import chatroom_info
from database import pool
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
    room_friend_name = room_info["roomFriendName"]
    cnx = pool.get_connection()
    cur = cnx.cursor(dictionary=True)
    cur.execute(
        "SELECT user_2, user_1, img, user_namespace FROM member_info JOIN member_friend ON user_namespace=user_2 OR user_namespace=user_1 WHERE NOT name=%s AND room_id=%s",
        (room_friend_name, chat_room_id))
    info = cur.fetchone()
    room_user_img = info["img"]
    cur.close()
    cnx.close()

    @socketio.on("message", namespace="/talk")
    def send_back_data(message):
        if message == "empty":
            pass
        else:
            typing_user = info["user_namespace"]
            message_content = message["message"]
            current_time = handle_time()
            join_room(chat_room_id)
            handle_history(typing_user, current_time,
                           message_content, chat_room_id)
            user_info_for_room = {"message": message_content,
                                  "time": current_time, "typing_user": typing_user, "img": room_friend_img, "user_Img": room_user_img}
            emit("full_message", user_info_for_room, to=chat_room_id)


@socketio.on("draw", namespace="/talk")
def handle_draw(draw_info):
    emit("showDrawData", draw_info, broadcast=True)


@socketio.on("erase", namespace="/talk")
def handle_draw(erase_info):
    emit("eraseDrawData", erase_info, broadcast=True)


@socketio.on("clearDraw", namespace="/talk")
def handle_draw(erase_info):
    emit("clearDrawData", "ok", broadcast=True)


def handle_history(typing_user, current_time, message_content, chat_room_id):
    try:
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        cur.execute("INSERT INTO member_history(room_id_history, user, user_time, user_history) VALUES (%s, %s, %s, %s)",
                    (chat_room_id, typing_user, current_time, message_content))
        cnx.commit()
        data = jsonify({"ok": True})
        return data, 200
    except:
        data = jsonify({"error": True,
                        "message": "內部問題"
                        })
        return data, 500
    finally:
        cur.close()
        cnx.close()


def load_history(chat_room_id):
    try:
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        cur.execute("SELECT user, user_time, user_history FROM member_history WHERE room_id_history=%s)",
                    (chat_room_id,))
        data = jsonify({"ok": True})
        return data, 200
    except:
        data = jsonify({"error": True,
                        "message": "內部問題"
                        })
        return data, 500
    finally:
        cur.close()
        cnx.close()


if __name__ == '__main__':
    socketio.run(app, port=3000, debug=True)
