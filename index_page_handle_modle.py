from flask import *
from database import pool, dbRDS
import jwt
import datetime
from datetime import timezone


class member:
    def get_member(self):
        try:
            password = request.form["userPassword"]
            email = request.form["userEmail"]
            cnx = pool.get_connection()
            cur = cnx.cursor(dictionary=True)
            # cur.execute(
            #     "SELECT id, email FROM member_account WHERE email = %s AND password = %s", (email, password,))
            cur.execute(
                "SELECT id, email, name, img, user_namespace FROM member_account JOIN member_info ON user_id=id WHERE email = %s AND password = %s", (email, password,))
            info = cur.fetchone()
            if info:
                data = jsonify({"data": info})
                token = jwt.encode({"id": info["id"], "name": info["name"], "user_namespace": info["user_namespace"], "img": info["img"], "exp": datetime.datetime.now(
                    tz=timezone.utc)+datetime.timedelta(minutes=60)}, dbRDS["mysecret"], algorithm="HS256")
                data.set_cookie("user_token", token)
                return data, 200
            else:
                data = jsonify({"error": True,
                                "message": "account or password is wrong"
                                })
            return data, 400
        except:
            return "notlogin", 200
        finally:
            cur.close()
            cnx.close()

    # def check_member_login_info(self):
    #     token = request.cookies.get('user_token')
    #     user_info = jwt.decode(token.encode('UTF-8'),
    #                            dbRDS["mysecret"], algorithms="HS256")

    #     data = jsonify({"data": user_info
    #                     })
    #     return data, 200

    def handle_token_info(self, data):
        user_data = jsonify({"data": data})
        return user_data, 200

    def store_member(self):
        try:
            cnx = pool.get_connection()
            cur = cnx.cursor(dictionary=True)
            password = request.form["userPassword"]
            name = request.form["userName"]
            email = request.form["userEmail"]
            cur.execute(
                "SELECT * FROM member_account WHERE email = %s", (email,))
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
                img = "/static/img/unknowuser.jpeg"
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


member = member()


def check_token(callback):
    def get_token():
        token = request.cookies.get('user_token')
        if not token:
            # data = jsonify({"error": True, "message": "not login"})
            return render_template("login.html")
        try:
            user_info = jwt.decode(token.encode('UTF-8'),
                                   dbRDS["mysecret"], algorithms="HS256")
            return callback(user_info)
        except Exception as e:
            data = jsonify({"error": True, "message": "server issue"})
            return data, 500
    return get_token
