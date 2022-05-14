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
        print(info)
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
        user_namespace_data = request.args.get("user_namespace")
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        cur.execute(
            "SELECT name, img, user_namespace FROM member_info WHERE user_id = %s", (user_namespace_data,))
        info = cur.fetchone()
        print(info)
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


# `user_1` VARCHAR(255) NOT NULL,
# FOREIGN KEY(user_1) REFERENCES member_info(user_namespace),
# `user_2` VARCHAR(255) NOT NULL,
