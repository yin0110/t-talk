from wsgiref.util import request_uri
from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room, send, Namespace
from numpy import broadcast
from sqlalchemy import true, values
from namespace import user_namespace
from room import contact_room
from datetime import datetime, date
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


# now = datetime.now()
# day = date.today()
# current_time = now.strftime("%H:%M")
# today = day.strftime("%m/%d (%a)")


def handle_time():
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    return current_time


@app.route("/")
def index():
    return render_template("chatroom.html")


@socketio.on('message')
def handle_message(data):
    socketio.emit("send", 'received message: ' + data)


@socketio.on('my-event', namespace='/test')
def handle_my_custom_namespace_event(json):
    print('received json: ' + str(json))
    emit("my_response", "123")


@socketio.on('join')
def on_join(data):
    # username = data['username']
    room = data["room"]
    print(data)
    join_room(room)
    emit("room-message", "abc", to=room)


@socketio.on("join_room")
def show_room(data):
    room = room(data["username"], data["settingname"], None)
    room.add_message(data["message"])


# set up namespace
user_namespace.__init__("eee", "yin", "myimg", "/user")
print(user_namespace.endpoint)
user_namespace.add_room(contact_room(0, "username", "userimg", "user"))
print(user_namespace)


@socketio.on('message', namespace=user_namespace.endpoint)
def handle_my_custom_namespace_event(message):
    if message == "empty":
        pass
    else:

        chat_room = user_namespace.rooms[0].room_id
        join_room(chat_room)
        current_time = handle_time()
        user_info_for_room = [message, current_time]
    emit("room-message", user_info_for_room, to=chat_room)


if __name__ == '__main__':
    socketio.run(app, port=3000, debug=True)
