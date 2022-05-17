let socketChat = io("/talk");
let user = localStorage.getItem("userNS");
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
		console.log(user);
		socketChat.emit("message", {
			message: result,
			user: user,
		});
	}
	// socketChat.on("full_message", (fullInfo) => {
	// 	let message = fullInfo["message"];
	// 	let time = fullInfo["time"];
	// 	let typeUser = fullInfo["typing_user"];
	// 	console.log(typeUser);
	// 	if (typeUser == user) {
	// 		buildMessageBox(fullInfo);
	// 	} else {
	// 		buildFriendMessageBox(fullInfo);
	// 	}
	// });
}
socketChat.on("full_message", function (fullInfo) {
	let message = fullInfo["message"];
	let time = fullInfo["time"];
	let typeUser = fullInfo["typing_user"];
	console.log(typeUser);
	if (typeUser == user) {
		buildMessageBox(fullInfo);
	} else {
		buildFriendMessageBox(fullInfo);
	}
});
// let socketChat = io("/talk");
// socketChat.on("full_message", (fullInfo) => {
// 	let message = fullInfo["message"];
// 	let time = fullInfo["time"];
// 	let typeUser = fullInfo["typing_user"];
// 	console.log(typeUser);
// 	if (typeUser == user) {
// 		buildMessageBox(fullInfo);
// 	} else {
// 		buildFriendMessageBox(fullInfo);
// 	}
// });
// socketChat.on("full_message", (data) => {
// 	console.log(data);
// });
// socketChat.on(
// 	"full_message",
// 	(fullInfo) => {
// 		console.log(fullInfo);
// 	}

// let message = fullInfo["message"];
// let time = fullInfo["time"];
// let typeUser = fullInfo["typing_user"];
// if (typeUser == user) {
// 	buildMessageBox(fullInfo);
// } else {
// 	buildFriendMessageBox(fullInfo);
// }
// );

// socketChat.on("full_message", (data) => {
// 	console.log(data);
// });
