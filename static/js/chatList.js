let friendSection = document.querySelector(
	".room--personSection__chatInfoOuter"
);
let userList = document.querySelector(".nav--functionbar__contactperson");
let chatIcon = document.querySelector(".nav--functionbar__chatting");
async function showChatFriends() {
	let userUrl = `/api/usr`;
	let userAccessMethod = "GET";
	let userFetchInfo = await fetch(userUrl, {
		method: userAccessMethod,
	});
	let statusCode = await userFetchInfo.json();
	if (statusCode["message"]) {
		location.href = `/`;
	} else {
		userName = statusCode["data"]["name"];
		userNamespace = statusCode["data"]["user_namespace"];
		let url = `/api/usr_friends?namespace=${userNamespace}&username=${userName}`;
		let accessMethod = "GET";
		let fetchInfo = await fetch(url, {
			method: accessMethod,
		});
		let response = await fetchInfo.json();
		if (response["data"]) {
			let friendInfo = response["data"];
			await buildChatFriendList(friendInfo);
			Array.from(
				document.querySelectorAll(".room--personSection__chatInfo")
			).forEach((element) => {
				element.addEventListener("click", async (e) => {
					showChatRoom();
					await buildChatRoom(e);
				});
			});
		} else {
			console.log("error");
			let friendSection = document.querySelector(
				".room--personSection__chatInfoOuter"
			);
			friendSection.innerHTML = "";
		}
	}
}

chatIcon.addEventListener("click", showChatList);
async function showChatList() {
	search.style.display = "block";
	searchFriendTitle.style.display = "none";
	chatFriends.style.display = "block";
	searchFriend.style.display = "none";
	searchFriendBoxOuter.style.display = "none";
	await showChatFriends();
}
userList.addEventListener("click", showFriendList);

async function showFriendList() {
	search.style.display = "block";
	searchFriendTitle.style.display = "none";
	chatFriends.style.display = "block";
	searchFriend.style.display = "none";
	searchFriendBoxOuter.style.display = "none";
	friendSection.innerHTML = "";
	let url = `/api/usr`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	username = statusCode["data"]["name"];
	userImg = statusCode["data"]["img"];
	userNamespace = statusCode["data"]["user_namespace"];
	let chatFriendInfo = document.createElement("div");
	friendSection.appendChild(chatFriendInfo);
	chatFriendInfo.className = "room--personSection__chatInfo__user";
	let chatFriendImg = document.createElement("img");
	chatFriendInfo.appendChild(chatFriendImg);
	chatFriendImg.className = "personSection__chatInfo__userImg";
	chatFriendImg.src = userImg;
	let chatFriendName = document.createElement("div");
	chatFriendName.className = "personSection__chatInfo__userName";
	chatFriendInfo.appendChild(chatFriendName);
	chatFriendName.innerHTML = username;
	let userMark = document.createElement("div");
	chatFriendInfo.appendChild(userMark);
	userMark.className = "user__info";
	userMark.innerHTML = "User";
	let friendListDiv = document.createElement("div");
	friendSection.appendChild(friendListDiv);
	friendListDiv.className = "friend--list";
	let friendListText1 = document.createElement("div");
	friendListText1.className = "friend--list__front";
	friendListDiv.appendChild(friendListText1);
	friendListText1.innerHTML = "Friend List";
	let friendListText2 = document.createElement("div");
	friendListText2.className = "friend--list__end";
	friendListDiv.appendChild(friendListText2);
	friendListText2.innerHTML = "all";
	let urlApi = `/api/usr_friends?namespace=${userNamespace}&username=${username}`;
	let method = "GET";
	let fetchData = await fetch(urlApi, {
		method: method,
	});
	let response = await fetchData.json();
	if (response["data"]) {
		let friendInfo = response["data"];
		await buildList(friendInfo);
		Array.from(
			document.querySelectorAll(".room--personSection__chatInfo")
		).forEach((element) => {
			element.addEventListener("click", async (e) => {
				showChatRoom();
				await buildChatRoom(e);
			});
		});
	}
}

function buildChatFriend(length, img, roomID, name) {
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
	}
}
async function buildList(friendInfo) {
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
	await buildChatFriend(length, img, roomID, name);
}

////window onload
async function showIndexList() {
	search.style.display = "block";
	searchFriendTitle.style.display = "none";
	chatFriends.style.display = "block";
	searchFriend.style.display = "none";
	searchFriendBoxOuter.style.display = "none";
	friendSection.innerHTML = "";
	let url = `/api/usr`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	username = statusCode["data"]["name"];
	userImg = statusCode["data"]["img"];
	userNamespace = statusCode["data"]["user_namespace"];
	let chatFriendInfo = document.createElement("div");
	friendSection.appendChild(chatFriendInfo);
	chatFriendInfo.className = "room--personSection__chatInfo__user";
	let chatFriendImg = document.createElement("img");
	chatFriendInfo.appendChild(chatFriendImg);
	chatFriendImg.className = "personSection__chatInfo__userImg";
	chatFriendImg.src = userImg;
	let chatFriendName = document.createElement("div");
	chatFriendName.className = "personSection__chatInfo__userName";
	chatFriendInfo.appendChild(chatFriendName);
	chatFriendName.innerHTML = username;
	let userMark = document.createElement("div");
	chatFriendInfo.appendChild(userMark);
	userMark.className = "user__info";
	userMark.innerHTML = "User";
	let friendListDiv = document.createElement("div");
	friendSection.appendChild(friendListDiv);
	friendListDiv.className = "friend--list";
	let friendListText1 = document.createElement("div");
	friendListText1.className = "friend--list__front";
	friendListDiv.appendChild(friendListText1);
	friendListText1.innerHTML = "Friend List";
	let friendListText2 = document.createElement("div");
	friendListText2.className = "friend--list__end";
	friendListDiv.appendChild(friendListText2);
	friendListText2.innerHTML = "all";
	let urlApi = `/api/usr_friends?namespace=${userNamespace}&username=${username}`;
	let method = "GET";
	let fetchData = await fetch(urlApi, {
		method: method,
	});
	let response = await fetchData.json();
	if (response["data"]) {
		let friendInfo = response["data"];
		await buildList(friendInfo);
		Array.from(
			document.querySelectorAll(".room--personSection__chatInfo")
		).forEach((element) => {
			element.addEventListener("click", async (e) => {
				showChatRoom();
				await buildChatRoom(e);
			});
		});
	}
}
showIndexList();
