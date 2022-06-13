let lastPage = null;

async function buildChatFriendList_div(length, img, roomID, name) {
	for (let infoLength = 0; infoLength < length; infoLength++) {
		let perImg = img[infoLength];
		let perRoomID = roomID[infoLength];
		let perName = name[infoLength];
		let url = `/api/chatlist_info/${perRoomID}`;
		let accessMethod = "GET";
		let fetchInfo = await fetch(url, {
			method: accessMethod,
		});
		let statusCode = await fetchInfo.json();
		if (statusCode["data"].length != 0) {
			let history = statusCode["data"][0]["user_history"];
			let time = statusCode["data"][0]["user_time"];
			let stringTime = time.toString();
			hr = stringTime.slice(8, 10);
			min = stringTime.slice(10, 12);
			let messageTimg = hr + ":" + min;
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
			lastChatTime.innerHTML = messageTimg;
			chatFriendInfo.appendChild(lastChatTime);
			let lastestChatInfo = document.createElement("div");
			lastestChatInfo.className = "personSection__chatInfo__latestMessage";
			lastestChatInfo.innerHTML = history;
			chatFriendInfo.appendChild(lastestChatInfo);
		} else {
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
			lastChatTime.innerHTML = "";
			chatFriendInfo.appendChild(lastChatTime);
			let lastestChatInfo = document.createElement("div");
			lastestChatInfo.className = "personSection__chatInfo__latestMessage";
			lastestChatInfo.innerHTML = "";
			chatFriendInfo.appendChild(lastestChatInfo);
		}
	}
}

async function buildChatFriendList(friendInfo) {
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
	await buildChatFriendList_div(length, img, roomID, name);
}

async function loadHistory(roomID) {
	let friedImgDiv = document.querySelector(".chattingRoom--chatPerson__img");
	let friendImg = friedImgDiv.src;
	let chatRoomSpace = document.querySelector(".chattingRoom--content");
	let divTop = document.createElement("div");
	let divExtend = document.createElement("div");
	chatRoomSpace.appendChild(divTop);
	chatRoomSpace.appendChild(divExtend);
	let apiUrl = `/api/history/${roomID}`;
	let method = "GET";
	let response = await fetch(apiUrl, {
		method: method,
	});
	let roomInfo = await response.json();
	let roomHistory = roomInfo["data"];
	let time = [];
	let message = [];
	let fullTime = [];
	for (info in roomHistory) {
		let user = roomHistory[info].user;
		let detailedTime = roomHistory[info].user_time;
		let history = roomHistory[info].user_history;
		let stringTime = detailedTime.toString();
		min = stringTime.slice(8, 10);
		sec = stringTime.slice(10, 12);
		let messageTimg = min + ":" + sec;
		let timeInfo = { user: user, time: messageTimg };
		let messageInfo = { user: user, message: history };
		time.push(timeInfo);
		fullTime.push(detailedTime);
		message.push(messageInfo);
	}

	let length = time.length;
	let userImg = roomInfo["user"]["user_img"];
	let userNS = roomInfo["user"]["user_ns"];
	for (let infoLength = 0; infoLength < length; infoLength++) {
		let historyUsername = time[infoLength]["user"];
		let historyMessage = message[infoLength]["message"];
		let historyTime = time[infoLength]["time"];
		let fullInfo = {
			user_Img: userImg,
			message: historyMessage,
			time: historyTime,
		};
		if (historyUsername == userNS) {
			buildMessageBox(fullInfo);
		} else {
			let friendFullInfo = {
				user_Img: friendImg,
				message: historyMessage,
				time: historyTime,
			};
			buildFriendMessageBox(friendFullInfo);
		}
	}

	// if (divExtend.id == "top__extend__div") {
	// 	let options = {
	// 		root: null,
	// 		rootmargin: "-5px",
	// 		threshold: 0.05,
	// 	};
	// 	const observer = new IntersectionObserver(topChat, options);
	// 	const target = divTop;
	// 	observer.observe(target);
	// 	let messageQty = result["foundQty"];
	// 	console.log(result);
	// 	function topChat(entries, ob) {
	// 		entries.forEach(async (entry) => {
	// 			if (entry.isIntersecting) {
	// 				if (messageQty == 21) {
	// 					let time = result["messageInfo"]["time"];
	// 					let url = `/api/load_previous_history/${roomID}/${time}`;
	// 					let firstDiv = chatRoomSpace.childNodes[2];
	// 					let value = firstDiv.offsetTop;
	// 					result = await buildHistoryNextPage(
	// 						roomID,
	// 						clickedTime,
	// 						divExtend,
	// 						url
	// 					);
	// 					chatRoomSpace.scrollTop = firstDiv.offsetTop - value;
	// 				} else {
	// 					ob.unobserve(target);
	// 				}
	// 			}
	// 		});
	// 	}
	// } else {
	divExtend.id = "top__extend__div";
	let options = {
		root: null,
		rootmargin: "-5px",
		threshold: 0.05,
	};
	const observer = new IntersectionObserver(topChat, options);
	const target = divTop;
	observer.observe(target);
	let flag = false;
	function topChat(entries, ob) {
		entries.forEach(async (entry) => {
			if (entry.isIntersecting) {
				if (flag == false) {
					let url = `/api/load_previous_history/${roomID}/${fullTime[0]}`;
					await buildPreviousPage(roomID, fullTime[0], divExtend, url);
					flag = true;
				} else {
					// ob.unobserve(target);
					if (lastPage == undefined) {
						ob.unobserve(target);
					} else {
						let messageQty = lastPage["foundQty"];
						console.log(messageQty);
						if (messageQty == 21) {
							let time = lastPage["messageInfo"][0]["time"];
							console.log(time);
							let url = `/api/load_previous_history/${roomID}/${time}`;
							let firstDiv = chatRoomSpace.childNodes[2];
							let value = firstDiv.offsetTop;
							await buildPreviousPage(roomID, time, divExtend, url);
							chatRoomSpace.scrollTop = firstDiv.offsetTop - value;
						} else {
							let time = lastPage["messageInfo"][0]["time"];
							let url = `/api/load_previous_history/${roomID}/${time}`;
							let firstDiv = chatRoomSpace.childNodes[2];
							let value = firstDiv.offsetTop;
							await buildPreviousPage(roomID, time, divExtend, url);
							chatRoomSpace.scrollTop = firstDiv.offsetTop - value;
							ob.unobserve(target);
						}
					}
				}
			}
		});
	}
	// }
}
// for build chattingroom content interface
async function buildChatRoom(e) {
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
	chatFriendName.id = roomID;
	chatFriendName.innerHTML = roomFriendName;
	let painting = document.querySelector(".chattingRoom--content__painting");
	painting.style.display = "none";
	let socket = io("/talk");
	await loadHistory(roomID);
}

async function buildPreviousPage(roomID, clickedTime, divEnd, url) {
	if (clickedTime == undefined) {
	} else {
		let method = "GET";
		let response = await fetch(url, {
			method: method,
		});
		let statusCode = await response.json();
		let historyInfo = statusCode["data"];
		let userInfo = statusCode["user"];
		let history = [];
		let fullTime = [];
		let time = [];
		let user = [];
		let img = [];
		let friendDiv = document.querySelector(".chattingRoom--chatPerson__name");
		let friendName = friendDiv.innerHTML;
		let friendImgDiv = document.querySelector(".chattingRoom--chatPerson__img");
		let friendImg = friendImgDiv.src;
		for (data in historyInfo) {
			let allName = historyInfo[data].user;
			if (allName == userInfo["user_namespace"]) {
				userName = userInfo["name"];
				user.push(userName);
				img.push(userInfo["img"]);
			} else {
				user.push(friendName);
				img.push(friendImg);
			}
			let historyTime = historyInfo[data].user_time;
			let stringTime = historyTime.toString();
			hr = stringTime.slice(8, 10);
			min = stringTime.slice(10, 12);
			let messageTimg = hr + ":" + min;
			time.push(messageTimg);
			fullTime.push(historyTime);
			let allHistory = historyInfo[data].user_history;
			history.push(allHistory);
		}
		let foundQty = time.length;
		let lastMassage = [];
		if (foundQty == 21) {
			for (let length = 0; length < foundQty - 1; length++) {
				if (length == 0) {
					let perFullTime = fullTime[length];
					let perHistory = history[length];
					let searchInfo = { time: perFullTime, history: perHistory };
					lastMassage.push(searchInfo);
					lastPage = { messageInfo: lastMassage, foundQty: foundQty };
				}
				let perImg = img[length];
				// let perFullTime = fullTime[length];
				let perName = user[length];
				let perTime = time[length];
				let perHistory = history[length];
				let fullInfo = {
					user_Img: perImg,
					message: perHistory,
					time: perTime,
				};

				if (perName == userInfo["name"]) {
					buildHistoryMessageBox(fullInfo, divEnd);
				} else {
					buildFriendHistoryMessageBox(fullInfo, divEnd);
				}
			}
		} else {
			for (let length = 0; length < foundQty; length++) {
				let perImg = img[length];
				let perName = user[length];
				let perTime = time[length];
				let perHistory = history[length];
				let fullInfo = {
					user_Img: perImg,
					message: perHistory,
					time: perTime,
				};

				if (perName == userInfo["name"]) {
					buildHistoryMessageBox(fullInfo, divEnd);
				} else {
					buildFriendHistoryMessageBox(fullInfo, divEnd);
				}
			}
			lastPage = undefined;
		}
	}
}
