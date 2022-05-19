function buildChatFriendList_div(length, img, roomID, name) {
	for (let infoLength = 0; infoLength < length; infoLength++) {
		let perImg = img[infoLength];
		let perRoomID = roomID[infoLength];
		let perName = name[infoLength];
		let chatFriendInfo = document.createElement("div");
		friendSection.appendChild(chatFriendInfo);
		chatFriendInfo.setAttribute("id", perRoomID);
		chatFriendInfo.className = "room--personSection__chatInfo";
		let chatFriendImg = document.createElement("img");
		chatFriendInfo.appendChild(chatFriendImg);
		chatFriendImg.className = "personSection__chatInfo__personImg";
		chatFriendImg.src = perImg;
		let chatFriendName = document.createElement("div");
		chatFriendName.className = "personSection__chatInfo__roomName";
		chatFriendInfo.appendChild(chatFriendName);
		chatFriendName.innerHTML = perName;
		let lastChatTime = document.createElement("div");
		lastChatTime.className = "personSection__chatInfo__messageTime";
		lastChatTime.innerHTML = "09:00";
		chatFriendInfo.appendChild(lastChatTime);
		let lastestChatInfo = document.createElement("div");
		lastestChatInfo.className = "personSection__chatInfo__latestMessage";
		lastestChatInfo.innerHTML = "今天好天氣";
		chatFriendInfo.appendChild(lastestChatInfo);
	}
}

function buildChatFriendList(friendInfo) {
	friendSection.innerHTML = "";
	let img = [];
	let name = [];
	let roomID = [];
	for (data in friendInfo) {
		let allImg = friendInfo[data].img;
		img.push(allImg);
		let allName = friendInfo[data].name;
		name.push(allName);
		let allRoomID = friendInfo[data].room_id;
		roomID.push(allRoomID);
	}
	let length = img.length;
	buildChatFriendList_div(length, img, roomID, name);
}

// for build chattingroom content interface
function buildChatRoom(e) {
	let chatroomContnet = document.querySelector(".chattingRoom--content");
	chatroomContnet.innerHTML = "";
	let roomFriendName = e.currentTarget.childNodes[1].textContent;
	let roomImg = e.currentTarget.childNodes[0].src;
	let roomID = e.currentTarget.id;
	let chatFriendImg = document.querySelector(".chattingRoom--chatPerson__img");
	chatFriendImg.src = roomImg;
	let chatFriendName = document.querySelector(
		".chattingRoom--chatPerson__name"
	);
	chatFriendName.innerHTML = roomFriendName;
	let userImgDiv = document.querySelector(".chattingRoom--user__img");
	let userImg = userImgDiv.src;

	socket.emit("connect_to_ns", {
		roomID: roomID,
		roomFriendImg: roomImg,
		roomUserImg: userImg,
		roomFriendName: roomFriendName,

		// user: userNamespace,
	});
}
