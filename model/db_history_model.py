from database import db
from flask import *
from firebase_admin import firestore
from model.index_page_model import get_user_info


# add documents with auto ID


class history:
    def store_history(self, room_id, user, time, message):
        try:
            data = {"room_id": room_id, "user": user,
                    "user_time": time, "user_history": message, "info_status": "new"}
            db.collection("history").add(data)
        except:
            pass

    def load_history(self, room_id):
        try:
            user_info = get_user_info()
            user_img = user_info["img"]
            user_ns = user_info["user_namespace"]
            user = {"user_img": user_img, "user_ns": user_ns}
            result = db.collection("history").where(
                "room_id", "==", room_id).order_by("user_time", direction=firestore.Query.DESCENDING).limit(8).stream()
            history_list = []
            for data in result:
                history_list.append(data.to_dict())

            def get_time(history_list):
                return history_list.get("user_time")
            history_list.sort(key=get_time)
            data = jsonify({"data": history_list, "user": user})
            return data
        except:
            pass

    def load_previous_history(self, room_id, time):
        user_info = get_user_info()
        time = int(time)
        result = db.collection("history").where(
            "room_id", "==", room_id).start_after({"user_time": time}).order_by("user_time", direction=firestore.Query.DESCENDING).limit(21).stream()
        history_list = []
        for data in result:
            history_list.append(data.to_dict())

        def get_time(history_list):
            return history_list.get("user_time")
        history_list.sort(key=get_time)
        data = jsonify({"data": history_list, "user": user_info})
        return data

    def load_friend_list_history(self, room_id):
        result = db.collection("history").where(
            "room_id", "==", room_id).order_by("user_time", direction=firestore.Query.DESCENDING).limit(1).stream()
        history_list = []
        for data in result:
            history_list.append(data.to_dict())

        def get_time(history_list):
            return history_list.get("user_time")
        history_list.sort(key=get_time)
        data = jsonify({"data": history_list})
        return data

    def delete_history(self, message, new_message):
        try:
            result = db.collection("history").where(
                "message", "==", message).get()
            for data in result:
                key = data.id
                db.collection("history").document(
                    key).update({"message": new_message})
        except:
            pass


history = history()
