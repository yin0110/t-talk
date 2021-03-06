// async function joinppppp(roomID) {
//取得message input 對應div以及設置enter事件
let input = document.querySelector(".messageBar__texting__input");
input.addEventListener("keypress", getMessage);
//取得send button並設置click event
let sendButton = document.querySelector(".messageBar__send");
sendButton.addEventListener("click", click);
let socketChat = io("/talk");

async function click() {
	clientMessage = input.value;
	if (clientMessage.length == 0) {
		return "empty";
	} else {
		clientMessage = input.value;
		input.value = "";
		let url = `/api/usr`;
		let accessMethod = "GET";
		let fetchInfo = await fetch(url, {
			method: accessMethod,
		});
		let statusCode = await fetchInfo.json();
		if (statusCode["message"]) {
			location.href = `/`;
		} else {
			userNamespace = statusCode["data"]["user_namespace"];
			let charFriend = document.querySelector(
				".chattingRoom--chatPerson__name"
			);
			let roomID = charFriend.id;
			let roomName = charFriend.innerHTML;

			if (clientMessage == "empty") {
			} else {
				socketChat.emit("message", {
					message: clientMessage,
					roomID: roomID,
					roomName: roomName,
				});
			}
		}
		return clientMessage;
	}
}

async function getMessage(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		result = await click();
	}
}
socketChat.on("full_message", async function (fullInfo) {
	let typeUser = fullInfo["typing_user"];
	let url = `/api/usr`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	if (statusCode["message"]) {
		location.href = `/`;
	} else {
		userNamespace = statusCode["data"]["user_namespace"];
		if (typeUser == userNamespace) {
			buildMessageBox(fullInfo);
		} else {
			buildFriendMessageBox(fullInfo);
		}
	}
});
// }
