//for building persionSection chat friend box
function buildChatFriend(roomsInfo) {
	let friendSection = document.querySelector(
		".room--personSection__chatInfoOuter"
	);
	let chatFriendInfo = document.createElement("div");
	friendSection.appendChild(chatFriendInfo);
	chatFriendInfo.className = "room--personSection__chatInfo";
	let chatFriendImg = document.createElement("img");
	chatFriendInfo.appendChild(chatFriendImg);
	chatFriendImg.className = "personSection__chatInfo__personImg";
	chatFriendImg.src = roomsInfo[1];
	let chatFriendName = document.createElement("div");
	chatFriendName.className = "personSection__chatInfo__roomName";
	chatFriendInfo.appendChild(chatFriendName);
	chatFriendName.innerHTML = roomsInfo[0];
	let lastChatTime = document.createElement("div");
	lastChatTime.className = "personSection__chatInfo__messageTime";
	lastChatTime.innerHTML = "09:00";
	chatFriendInfo.appendChild(lastChatTime);
	let lastestChatInfo = document.createElement("div");
	lastestChatInfo.className = "personSection__chatInfo__latestMessage";
	lastestChatInfo.innerHTML = "今天好天氣";
	chatFriendInfo.appendChild(lastestChatInfo);
}

//for building chattingroom userinfo
function buildUserInfo(username, userImg) {
	let divUserName = document.querySelector(".chattingRoom--user__name");
	divUserName.innerHTML = username;
	let divUserImg = document.querySelector(".chattingRoom--user__img");
	divUserImg.src = userImg;
}

//for building chattingroom mesaage
// function buildMessageBox(messageInfo) {
// 	let chatRoomSpace = document.querySelector(".chattingRoom--content");
// 	let userInfo = document.createElement("div");
// 	userInfo.className = "chattingRoom--content__user";
// 	chatRoomSpace.appendChild(userInfo);
// 	let userImg = document.createElement("img");
// 	userInfo.appendChild(userImg);
// 	userImg.className = "chattingRoom--content__userImg";
// 	let messageBox = document.createElement("div");
// 	messageBox.className = "chattingRoom--content__textBox";
// 	userInfo.appendChild(messageBox);
// 	let message = document.createElement("p");
// 	message.className = "content__textBox__texting";
// 	message.innerHTML = messageInfo[0];
// 	messageBox.appendChild(message);
// 	let currentTime = document.createElement("div");
// 	currentTime.className = "chattingRoom--content__messageTime";
// 	userInfo.appendChild(currentTime);
// 	currentTime.innerHTML = messageInfo[1];
// 	userInfo.scrollIntoView();
// 	chatRoomSpace.scroll({ top: userInfo.offsetTop, behavior: "smooth" });
// }

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
	message.innerHTML = messageInfo["message"];
	messageBox.appendChild(message);
	let currentTime = document.createElement("div");
	currentTime.className = "chattingRoom--content__messageTime";
	userInfo.appendChild(currentTime);
	currentTime.innerHTML = messageInfo["time"];
	chatRoomSpace.scroll({ top: userInfo.offsetTop, behavior: "smooth" });
}

// function buildFriendMessageBox(messageInfo) {
// 	let chatRoomSpace = document.querySelector(".chattingRoom--content");
// 	let userInfo = document.createElement("div");
// 	userInfo.className = "chattingRoom--content__person";
// 	chatRoomSpace.appendChild(userInfo);
// 	let userImg = document.createElement("img");
// 	userInfo.appendChild(userImg);
// 	userImg.className = "chattingRoom--content__personImg";
// 	let messageBox = document.createElement("div");
// 	messageBox.className = "chattingRoom--content__personTextBox";
// 	userInfo.appendChild(messageBox);
// 	let message = document.createElement("p");
// 	message.className = "content__textBox__personTexting";
// 	message.innerHTML = messageInfo[0];
// 	messageBox.appendChild(message);
// 	let currentTime = document.createElement("div");
// 	currentTime.className = "chattingRoom--content__personMessageTime";
// 	userInfo.appendChild(currentTime);
// 	currentTime.innerHTML = messageInfo[1];
// 	//自動移動到訊息位置
// 	chatRoomSpace.scroll({ top: userInfo.offsetTop, behavior: "smooth" });
// }

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
	message.innerHTML = messageInfo["message"];
	messageBox.appendChild(message);
	let currentTime = document.createElement("div");
	currentTime.className = "chattingRoom--content__personMessageTime";
	userInfo.appendChild(currentTime);
	currentTime.innerHTML = messageInfo["time"];
	//自動移動到訊息位置
	chatRoomSpace.scroll({ top: userInfo.offsetTop, behavior: "smooth" });
}
