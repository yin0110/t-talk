var socket = io("http://127.0.0.1:3000/");
var socket2 = io("/user");

//取得message input 對應div以及設置enter事件
let input = document.querySelector(".messageBar__texting__input");
input.addEventListener("keypress", getMessage);
//取得send button並設置click event
let sendButton = document.querySelector(".messageBar__send");
sendButton.addEventListener("click", click);

function buildMessageBox(messageInfo) {
	let chatRoomSpace = document.querySelector(".chattingRoom--content");
	let userInfo = document.createElement("div");
	userInfo.className = "chattingRoom--content__user";
	chatRoomSpace.appendChild(userInfo);
	let userImg = document.createElement("img");
	userInfo.appendChild(userImg);
	userImg.className = "chattingRoom--content__userImg";
	let messageBox = document.createElement("div");
	messageBox.className = "chattingRoom--content__textBox";
	userInfo.appendChild(messageBox);
	let message = document.createElement("p");
	message.className = "content__textBox__texting";
	message.innerHTML = messageInfo[0];
	messageBox.appendChild(message);
	let currentTime = document.createElement("div");
	currentTime.className = "chattingRoom--content__messageTime";
	userInfo.appendChild(currentTime);
	currentTime.innerHTML = messageInfo[1];
	userInfo.scrollIntoView();
	chatRoomSpace.scroll({ top: userInfo.offsetTop, behavior: "smooth" });
}
function buildFriendMessageBox(messageInfo) {
	let chatRoomSpace = document.querySelector(".chattingRoom--content");
	let userInfo = document.createElement("div");
	userInfo.className = "chattingRoom--content__person";
	chatRoomSpace.appendChild(userInfo);
	let userImg = document.createElement("img");
	userInfo.appendChild(userImg);
	userImg.className = "chattingRoom--content__personImg";
	let messageBox = document.createElement("div");
	messageBox.className = "chattingRoom--content__personTextBox";
	userInfo.appendChild(messageBox);
	let message = document.createElement("p");
	message.className = "content__textBox__personTexting";
	message.innerHTML = messageInfo[0];
	messageBox.appendChild(message);
	let currentTime = document.createElement("div");
	currentTime.className = "chattingRoom--content__personMessageTime";
	userInfo.appendChild(currentTime);
	currentTime.innerHTML = messageInfo[1];
	//自動移動到訊息位置
	chatRoomSpace.scroll({ top: userInfo.offsetTop, behavior: "smooth" });
}

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
		socket2.emit("message", result);
	}
}
socket2.on("room-message", function (userInfoFromServer) {
	// buildMessageBox(userInfoFromServer);
	buildFriendMessageBox(userInfoFromServer);
});

socket.emit("join", { user: "abc", room: "No", message: "ok" });
// socket.on("join", function (message) {
// 	console.log(message);
// });
socket.on("room-message", (msg) => {
	console.log("message from room: " + msg);
});

socket2.emit("my-event", "123");
socket2.on("my_response", (word) => {
	console.log(word);
});
