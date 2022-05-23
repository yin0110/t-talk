// import { buildMessageBox, buildFriendMessageBox } from "./buildContent";
// let chatNS = localStorage.getItem("chatNS");

let roomTitle = null;
// let socket = io("http://0.0.0.1:4000/");
// let socketChat = io(`/${chatNS}`);
let socket2 = io("/user");

// //取得message input 對應div以及設置enter事件
// let input = document.querySelector(".messageBar__texting__input");
// input.addEventListener("keypress", getMessage);
// //取得send button並設置click event
// let sendButton = document.querySelector(".messageBar__send");
// sendButton.addEventListener("click", click);

// function click() {
// 	clientMessage = input.value;
// 	if (clientMessage.length == 0) {
// 		return "empty";
// 	} else {
// 		clientMessage = input.value;
// 		input.value = "";
// 		return clientMessage;
// 	}
// }

// function getMessage(event) {
// 	if (event.key === "Enter") {
// 		event.preventDefault();
// 		result = click();
// 		socket2.emit("message", result);
// 	} else {
// 		event.preventDefault();
// 		result = click();
// 		socket2.emit("message", result);
// 	}
// }

//傳送訊息
// socket2.on("room-message", function (userInfoFromServer) {
// 	// buildMessageBox(userInfoFromServer);
// 	new buildFriendMessageBox(userInfoFromServer);
// });

//連線至聊天室
// sockerUser.emit(("connection", () => {}));

socket2.emit("connection", () => {});
socket2.on("build_rooms", function (roomInfo) {
	buildChatFriend(roomInfo);
	// function clickFriend() {
	// 	Array.from(
	// 		document.querySelectorAll(".room--personSection__chatInfo")
	// 	).forEach((element) => {
	// 		element.addEventListener("click", (e) => {
	// 			roomTitle = e.currentTarget.childNodes[1].textContent;
	// 			socket2.emit("get_friend_info", roomTitle);
	// 		});
	// 	});
	// }
	// clickFriend();
	// socket2.emit("get_friend_info", roomTitle);
});

//建立聯絡人聊天室
socket2.on("chatroom_info", (chatRoomData) => {
	console.log(chatRoomData);
	function loadChatRoomData(Data) {
		let chatFriendImg = document.querySelector(
			".chattingRoom--chatPerson__img"
		);
		chatFriendImg.src = Data.friend_img;
		let chatFriendName = document.querySelector(
			".chattingRoom--chatPerson__name"
		);
		chatFriendName.innerHTML = Data.friend_name;
	}
	loadChatRoomData(chatRoomData);
});

// socket.emit("join", { user: "abc", room: "No", message: "ok" });
