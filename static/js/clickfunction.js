let messageInput = document.querySelector(".messageBar__texting__input");
let loading = document.querySelector(".type--loading");
let keyFlag = false;
let socket = io("/talk");
async function joinRoom(roomID) {
	socket.emit("join", {
		roomID: roomID,
	});
	messageInput.addEventListener("keydown", (e) => {
		let charFriendDiv = document.querySelector(
			".chattingRoom--chatPerson__name"
		);
		let room = charFriendDiv.id;
		socket.emit("typing", {
			flag: true,
			roomDetail: room,
		});
		setTimeout(() => {
			// keyFlag = false;
			socket.emit("typing", {
				flag: false,
				roomDetail: room,
			});
		}, "3000");
	});

	socket.on("typingStatus", (info) => {
		let charFriendDiv = document.querySelector(
			".chattingRoom--chatPerson__name"
		);
		let chatFriendName = charFriendDiv.innerHTML;
		keyFlag = info["flag"];
		let typeUser = info["type_user"];
		if (typeUser == chatFriendName) {
			if (keyFlag == true) {
				loading.style.display = "flex";
			} else {
				setTimeout(() => {
					loading.style.display = "none";
				}, "5000");
			}
		}
	});
}
