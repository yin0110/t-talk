let chatNS = localStorage.getItem("chatNS");
socketChat = io(`${chatNS}`);
//取得message input 對應div以及設置enter事件
let input = document.querySelector(".messageBar__texting__input");
input.addEventListener("keypress", getMessage);
//取得send button並設置click event
let sendButton = document.querySelector(".messageBar__send");
sendButton.addEventListener("click", click);
function click() {
	clientMessage = input.value;
	if (clientMessage.length == 0) {
		return "empty";
	} else {
		clientMessage = input.value;
		input.value = "";
		return clientMessage;
	}
}
function getMessage(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		result = click();
		socketChat.emit("message", {
			message: result,
			user: userNamespace,
		});
	}
}

//  receive message from server
socketChat.on("room-message", (fullInfo) => {
	let message = fullInfo["message"];
	let time = fullInfo["time"];
	let typeUser = fullInfo["typing_user"];
	if (typeUser == userNamespace) {
		buildMessageBox(fullInfo);
	} else {
		buildFriendMessageBox(fullInfo);
	}
});
