from flask import *
from flask_socketio import SocketIO
from controller.index_page_route import index_handler
from controller.member_chatroom_info_route import chatroom_info
from controller.db_history_route import history_handler
from controller.history_search_route import search_handler
from model.main_model import event

# from datetime import timezone
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
app.register_blueprint(index_handler)
app.register_blueprint(chatroom_info)
app.register_blueprint(history_handler)
app.register_blueprint(search_handler)


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
    event.join_event(room_id)


@socketio.on("message", namespace="/talk")
def send_back_data(message):
    event.message_event(message)


@socketio.on("draw", namespace="/talk")
def handle_draw(draw_info):
    event.draw_event(draw_info)


@socketio.on("erase", namespace="/talk")
def handle_draw(erase_info):
    event.erase_event(erase_info)


@socketio.on("clearDraw", namespace="/talk")
def handle_draw(erase_info):
    event.clearDraw_event(erase_info)


@socketio.on("typing", namespace="/talk")
def handle_typing(type_info):
    event.type_event(type_info)


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=4000)
