from flask import *
from database import pool
from namespace import user_namespace


chatroom_info = Blueprint("chatroom_info", __name__)


@chatroom_info.route("/api/usr_info", methods=["GET"])
def handle_user_info_get():
    return get_user_info()


def get_user_info():
    try:
        user_id = request.args.get("user_id")
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        cur.execute(
            "SELECT name, img, user_namespace FROM member_info WHERE user_id = %s", (user_id,))
        info = cur.fetchone()
        data = jsonify({"data": info})
        return data, 200
    except:
        data = jsonify({"error": True,
                        "message": "內部問題"
                        })
        return data, 500
    finally:
        cur.close()
        cnx.close()


@chatroom_info.route("/api/usr_namespace", methods=["GET"])
def handle_user_namespace_get():
    return get_friend_namesapce()


@chatroom_info.route("/api/usr_namespace", methods=["POST"])
def handle_user_namespace_post():
    return add_friend()


def get_friend_namesapce():
    try:
        user_namespace_data = request.args.get("namespace")
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        # print(user_namespace_data)
        cur.execute(
            "SELECT name ,img, user_namespace FROM member_info WHERE user_namespace = %s", (user_namespace_data,))
        info = cur.fetchone()
        if info:
            data = jsonify({"data": info})
            return data, 200
        else:
            data = jsonify({"error": True,
                            "message": "無此聯絡人"
                            })
        return data, 500
    except:
        data = jsonify({"error": True,
                        "message": "內部問題"
                        })
        return data, 500
    finally:
        cur.close()
        cnx.close()


def add_friend():
    try:
        request_info = request.get_json(force=True)
        user1 = request_info["user1"]
        user2 = request_info["user2"]
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        cur.execute("INSERT INTO member_friend(user_1, user_2) VALUES (%s, %s)",
                    (user1, user2,))
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


@chatroom_info.route("/api/usr_friends", methods=["GET"])
def handle_user_friends_get():
    return show_friend()


def show_friend():
    try:
        user_1 = request.args.get("namespace")
        user_2 = request.args.get("namespace")
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        cur.execute(
            "SELECT room_id ,user_2, user_1 FROM member_friend WHERE user_1 = %s OR user_2 = %s", (user_1, user_2))
        info = cur.fetchone()
        if info["user_1"] == user_1:
            friend_namespace = info["user_2"]
            cur.execute(
                "SELECT user_namespace, img, name FROM member_info WHERE user_namespace = %s", (friend_namespace,))
            friend_info = cur.fetchone()
            full_info = {"friend": friend_info,
                         "room": info["room_id"], "chat_namespace": user_1}
            data = jsonify({"data": full_info})
            return data, 200
        else:
            friend_namespace = info["user_1"]
            cur.execute(
                "SELECT user_namespace, img, name FROM member_info WHERE user_namespace = %s", (friend_namespace,))
            friend_info = cur.fetchone()
            chatroom_NS = friend_info["user_namespace"]
            full_info = {"friend": friend_info,
                         "room": info["room_id"], "chat_namespace": chatroom_NS}
            data = jsonify({"data": full_info})
            return data, 200
    except:
        data = jsonify({"error": True,
                        "message": "內部問題"
                        })
        return data, 500
    finally:
        cur.close()
        cnx.close()
