

class contact_room():
    def __init__(self, room_id, room_title, room_img, namespace):
        self.room_id = room_id
        self.room_title = room_title
        self.room_img = room_img
        self.namespace = namespace
        # self.private_room = private_room
        self.history = []

    def add_message(self, message):
        self.history.append(message)
        return message

    def clear_history(self):
        self.history = []

    def __repr__(self):
        return f'{self.room_id} {self.room_title} {self.room_img} {self.namespace}'


# r = room(2, 3, 6)
# result = r.add_message("rrr")
# print(result)
# c = r.history
# print(c)
