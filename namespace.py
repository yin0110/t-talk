
# from os import name
from datetime import datetime, date
# namespace class

now = datetime.now()
day = date.today()
current_time = now.strftime("%H:%M")
today = day.strftime("%m/%d (%a)")


class user_namespace():
    def __init__(self, nsid, title, img, endpoint):
        self.nsid = nsid
        self.title = title
        self.img = img
        self.endpoint = endpoint
        self.rooms = []

    def add_room(self, room_obj):
        self.rooms.append(room_obj)
        return (self.rooms)

    def __repr__(self):
        return f'{self.nsid} {self.title} {self.img} {self.endpoint} {self.rooms}'


# n = namespace(2, 3, 4, 5)
# print(n.nsid)
# n.add_room("po")
# print(n)
# user_namespace.put_info("username", "yin", "myimg", "/user")

user_namespace = user_namespace("username", "yin", "myimg", "/user")
# print(user_namespace)
# room_obj = contact_room(0, "username", "userimg", "user")

# user_namespace.add_room(room_obj)
