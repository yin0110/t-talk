let messageInput = document.querySelector(".messageBar__texting__input");
let loading = document.querySelector(".type--loading");
let keyFlag = false;
let socket = io("/talk", {
	secure: true,
	reconnect: true,
	rejectUnauthorized: false,
});

messageInput.addEventListener("keydown", (e) => {
	let charFriendDiv = document.querySelector(".chattingRoom--chatPerson__name");
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
// messageInput.addEventListener("keyup", (e) => {
// 	let charFriend = document.querySelector(".chattingRoom--chatPerson__name");
// 	let roomID = charFriend.id;
// 	setTimeout(() => {
// 		socket.on("typingStatus", (info) => {});
// 		if (keyFlag == false) {
// 			loading.style.display = "none";
// 		} else {
// 			loading.style.display = "flex";
// 		}
// 	}, "8000");
// });

socket.on("typingStatus", (info) => {
	let charFriendDiv = document.querySelector(".chattingRoom--chatPerson__name");
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
