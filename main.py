from socket import socket
from flask import *
from flask_socketio import SocketIO, emit, join_room, leave_room, send, Namespace
# from namespace import user_namespace
# from room import contact_room
from datetime import datetime, date

from numpy import broadcast
from sqlalchemy import true
from index_page_Handle import index_handler
from member_chatroom_info import chatroom_info
from index_page_handle_modle import check_token
from database import pool, dbRDS
import jwt
import pytz
# from datetime import timezone
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
app.register_blueprint(index_handler)
app.register_blueprint(chatroom_info)


def handle_time():
    tw = pytz.timezone('Asia/Taipei')
    now = datetime.now(tw)
    current_time = now.strftime("%H:%M")
    return current_time


@ app.route("/")
def index():
    return render_template("login.html")


@ app.route("/chatroom")
def chat_room():
    return render_template("chatroom.html")


@app.route("/api/room/<room_id>", methods=["GET"])
def get_room_id(room_id):
    session["room_id"] = room_id
    data = jsonify({"data": "ok"})
    return data, 200


@socketio.on("message", namespace="/talk")
def send_back_data(message):
    if message == "empty":
        pass
    else:
        room = message["roomID"]
        token = request.cookies.get('user_token')
        user_info = jwt.decode(token.encode('UTF-8'),
                               dbRDS["mysecret"], algorithms="HS256")
        typing_user = user_info["user_namespace"]
        room_user_img = user_info["img"]
        # cnx = pool.get_connection()
        # cur = cnx.cursor(dictionary=True)
        # cur.execute(
        #     "SELECT user_2, user_1, img, user_namespace, name FROM member_info JOIN member_friend ON user_namespace=user_2 OR user_namespace=user_1 WHERE NOT name=%s AND room_id=%s",
        #     (typing_user, chat_room_id))
        # info = cur.fetchone()
        # room_friend_img = info["img"]
        # room_friend_name = info["name"]
        # cur.close()
        # cnx.close()
        message_content = message["message"]
        current_time = handle_time()
        join_room(room)
        # handle_history(typing_user, current_time,
        #                message_content, chat_room_id)
        user_info_for_room = {"message": message_content,
                              "time": current_time, "typing_user": typing_user, "user_Img": room_user_img}
        emit("full_message", user_info_for_room, to=room)


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
    socketio.run(app, host="0.0.0.0", port=4000, debug=True)
