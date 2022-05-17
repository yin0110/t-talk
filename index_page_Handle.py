from flask import *
from database import pool


index_handler = Blueprint("index_handler", __name__)


@index_handler.route("/api/usr", methods=["POST"])
def handle_member_post():
    return store_member()


@index_handler.route("/api/usr", methods=["PATCH"])
def handle_member_get():
    return get_member()


# def create_user_namespace(cur, cnx, name, email):
#     try:
#         cur.execute(
#             "SELECT id, email FROM member_account WHERE email = %s", (email,))
#         info = cur.fetchone()
#         print(info["id"])
#         cnx.commit()
#         return "ok"
#     except:
#         return "no", 500


def store_member():
    try:
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        password = request.form["userPassword"]
        name = request.form["userName"]
        email = request.form["userEmail"]
        cur.execute("SELECT * FROM member_account WHERE email = %s", (email,))
        account = cur.fetchone()
        if account:
            data = jsonify({"error": True,
                            "message": "此電子信箱已被註冊"
                            })
            return data, 400
        else:
            cur.execute("INSERT INTO member_account(email, password) VALUES (%s, %s)",
                        (email, password,))
            cnx.commit()
            cur.execute(
                "SELECT id, email FROM member_account WHERE email = %s", (email,))
            info = cur.fetchone()
            user_id = info["id"]
            img = "/static/img/funghi.png"
            namespace = "/"+email
            cur.execute("INSERT INTO member_info(name, user_id, img, user_namespace ) VALUES (%s, %s, %s, %s)",
                        (name, user_id, img, namespace))
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


def get_member():
    try:
        password = request.form["userPassword"]
        email = request.form["userEmail"]
        # name = request.form["userName"]
        cnx = pool.get_connection()
        cur = cnx.cursor(dictionary=True)
        cur.execute(
            "SELECT id, email FROM member_account WHERE email = %s AND password = %s", (email, password,))
        info = cur.fetchone()
        if info:
            data = jsonify({"data": info})
            return data, 200
    except:
        return "notlogin", 200
    finally:
        cur.close()
        cnx.close()


# def create_user_namespace(cur, cnx, name, email):
#     try:
#         cur.execute(
#             "SELECT id, email FROM member_account WHERE email = %s", (email,))
#         info = cur.fetchone()
#         print(info["id"])
#         cnx.commit()
#         return "ok"
#     except:
#         return "no", 500
