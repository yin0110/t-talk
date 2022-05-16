let chatIcon = document.querySelector(".nav--functionbar__chatting");
async function showChatFriends() {
	let userNamespace = localStorage.getItem("userNS");
	let url = `/api/usr_friends?namespace=${userNamespace}`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let response = await fetchInfo.json();
	if (response["data"]) {
		let friendSection = document.querySelector(
			".room--personSection__chatInfoOuter"
		);
		friendSection.innerHTML = "";
		let chatFriendInfo = document.createElement("div");
		friendSection.appendChild(chatFriendInfo);
		chatFriendInfo.className = "room--personSection__chatInfo";
		let chatFriendImg = document.createElement("img");
		chatFriendInfo.appendChild(chatFriendImg);
		chatFriendImg.className = "personSection__chatInfo__personImg";
		chatFriendImg.src = response["data"]["friend"]["img"];
		let chatFriendName = document.createElement("div");
		chatFriendName.className = "personSection__chatInfo__roomName";
		chatFriendInfo.appendChild(chatFriendName);
		chatFriendName.innerHTML = response["data"]["friend"]["name"];
		let lastChatTime = document.createElement("div");
		lastChatTime.className = "personSection__chatInfo__messageTime";
		lastChatTime.innerHTML = "09:00";
		chatFriendInfo.appendChild(lastChatTime);
		let lastestChatInfo = document.createElement("div");
		lastestChatInfo.className = "personSection__chatInfo__latestMessage";
		lastestChatInfo.innerHTML = "今天好天氣";
		chatFriendInfo.appendChild(lastestChatInfo);
		Array.from(
			document.querySelectorAll(".room--personSection__chatInfo")
		).forEach((element) => {
			element.addEventListener("click", (e) => {
				roomTitle = e.currentTarget.childNodes[1].textContent;
				let chatFriendImg = document.querySelector(
					".chattingRoom--chatPerson__img"
				);
				chatFriendImg.src = response["data"]["friend"]["img"];
				let chatFriendName = document.querySelector(
					".chattingRoom--chatPerson__name"
				);
				chatFriendName.innerHTML = response["data"]["friend"]["name"];
				localStorage.setItem("chatNS", response["data"]["chat_namespace"]);
				localStorage.setItem("room", response["data"]["room"]);
				// //connect to chat room
				let chatNS = localStorage.getItem("chatNS");
				let roomID = localStorage.getItem("room");
				socketChat = io(`${chatNS}`);
				socket.emit("connect_to_ns", {
					chatNS: chatNS,
					roomID: roomID,
					user: userNamespace,
				});
			});
		});
	} else {
		console.log("error");
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
