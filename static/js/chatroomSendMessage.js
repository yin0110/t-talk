let socketChat = io("/talk");

// let user = localStorage.getItem("userNS");
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
		let divUserImg = document.querySelector(".chattingRoom--user__img");
		let user = divUserImg.getAttribute("id");
		socketChat.emit("message", {
			message: result,
			user: user,
		});
	}
}
socketChat.on("full_message", function (fullInfo) {
	let typeUser = fullInfo["typing_user"];
	let divUserImg = document.querySelector(".chattingRoom--user__img");
	let user = divUserImg.getAttribute("id");
	// console.log(user, typeUser, fullInfo);
	if (typeUser == user) {
		// console.log(user, typeUser, fullInfo);

		buildMessageBox(fullInfo);
	} else {
		buildFriendMessageBox(fullInfo);
	}
});
