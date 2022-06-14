let searchIcon = document.querySelector(".chatPerson__toolIcon__search");
let searchIconImg = document.querySelector(".toolIcon__search__icon");
let searchClose = document.querySelector(".history_search_close");
let historySearchBox = document.querySelector(".history__search");
searchClose.addEventListener("click", closeSearch);
searchIcon.addEventListener("click", openSearch);
let toolBar = document.querySelector(".chattingRoom--chatPerson__toolIcon");
let historyInput = document.querySelector(".history__search__input");
let searchFlag = false;
let searchHistoryIcon = document.querySelector(".history__search__icon");
searchHistoryIcon.addEventListener("click", getSearchClick);
historyInput.addEventListener("keypress", getSearchInfo);
let previousPage = null;
let nextPage = null;
function openSearch() {
	if (searchFlag == false) {
		// paintDiv.style.display = "block";
		flag = true;
		toolBar.style.display = "none";
		historySearchBox.style.display = "block";
	}
}

function closeSearch() {
	historySearchBox.style.display = "none";
	toolBar.style.display = "flex";
	flag = false;
}

function getSearchClick() {
	historyInfo = historyInput.value;
	if (historyInfo.length == 0) {
		return "empty";
	} else {
		historyInfo = historyInput.value;
		// input.value = "";
		return historyInfo;
	}
}

async function getSearchInfo(event) {
	if (event.key === "Enter") {
		event.preventDefault();
		let result = getSearchClick();
		let chatroomContnet = document.querySelector(".chattingRoom--content");
		chatroomContnet.innerHTML = "";
		let friendDiv = document.querySelector(".chattingRoom--chatPerson__name");
		let roomID = friendDiv.id;
		let url = `/api/search/${roomID}/${result}`;
		let accessMethod = "GET";
		let fetchInfo = await fetch(url, {
			method: accessMethod,
		});
		let statusCode = await fetchInfo.json();
		let historyInfo = statusCode["data"];
		let userInfo = statusCode["user"];
		buildHistoryList(historyInfo, userInfo);
		Array.from(document.querySelectorAll(".history__chatInfo")).forEach(
			(element) => {
				element.addEventListener("click", async (e) => {
					let clickedTime = e.currentTarget.childNodes[2].id;
					let clickedHistory = e.currentTarget.childNodes[3].innerHTML;
					await loadSearchHistory(roomID, clickedTime, clickedHistory);
				});
			}
		);
	}
}
function buildHistoryList(historyInfo, userInfo) {
	let history = [];
	let time = [];
	let user = [];
	let img = [];
	let fullTime = [];
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
		let historyTime = historyInfo[data].time;
		let stringTime = historyTime.toString();
		year = stringTime.slice(0, 4);
		mon = stringTime.slice(4, 6);
		day = stringTime.slice(6, 8);
		hr = stringTime.slice(8, 10);
		min = stringTime.slice(10, 12);
		let messageTimg = year + "/" + mon + "/" + day + " " + hr + ":" + min;
		time.push(messageTimg);
		fullTime.push(historyTime);
		let allHistory = historyInfo[data].history;
		history.push(allHistory);
	}
	let foundQty = time.length;
	buildHistory(user, time, history, img, foundQty, fullTime);
}
function buildHistory(user, time, history, img, listLength, fullTime) {
	for (let length = 0; length < listLength; length++) {
		let perImg = img[length];
		let chatRoomDiv = document.querySelector(".chattingRoom--content");
		let perName = user[length];
		let perTime = time[length];
		let perFullTime = fullTime[length];
		let perHistory = history[length];
		let historyInfo = document.createElement("div");
		chatRoomDiv.appendChild(historyInfo);
		// historyInfo.setAttribute("id", perRoomID);
		historyInfo.className = "history__chatInfo";
		let userImg = document.createElement("img");
		historyInfo.appendChild(userImg);
		userImg.className = "history__chatInfo__personImg";
		userImg.src = perImg;
		let userName = document.createElement("div");
		userName.className = "history__chatInfo__roomName";
		historyInfo.appendChild(userName);
		userName.innerHTML = perName;
		let historyTime = document.createElement("div");
		historyTime.className = "history__chatInfo__messageTime";
		historyTime.innerHTML = perTime;
		historyTime.id = perFullTime;
		historyInfo.appendChild(historyTime);
		let historyChat = document.createElement("div");
		historyChat.className = "history__chatInfo__latestMessage";
		historyChat.innerHTML = perHistory;
		historyInfo.appendChild(historyChat);
	}
}

async function loadSearchHistory(roomID, clickedTime, clickedHistory) {
	let chatroomContnet = document.querySelector(".chattingRoom--content");
	chatroomContnet.innerHTML = "";
	let divEnd = chatroomContnet;

	//向下滑//////
	let apiUrl = `/api/load_search/${roomID}/${clickedTime}`;
	await buildHistoryNextPage(roomID, clickedTime, divEnd, apiUrl);
	/////////////////////////////////////////////////////////////

	await loadNextPage(nextPage, roomID);
}

async function buildSearchPrevioudPage(roomID, clickedTime, divEnd, url) {
	let apiUrl = `/api/search_load_earlier_data/${roomID}/${clickedTime}`;
	if (clickedTime == undefined) {
	} else {
		let method = "GET";
		let response = await fetch(apiUrl, {
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
			let historyTime = historyInfo[data].time;
			let stringTime = historyTime.toString();
			hr = stringTime.slice(8, 10);
			min = stringTime.slice(10, 12);
			let messageTimg = hr + ":" + min;
			time.push(messageTimg);
			fullTime.push(historyTime);
			let allHistory = historyInfo[data].history;
			history.push(allHistory);
		}
		let foundQty = time.length;
		let lastMassage = [];
		if (foundQty == 21) {
			let secondDivTop = document.createElement("div");
			divEnd.prepend(secondDivTop);
			for (let length = 0; length < foundQty - 1; length++) {
				if (length == 0) {
					let perFullTime = fullTime[length];
					let perHistory = history[length];
					let searchInfo = { time: perFullTime, history: perHistory };
					lastMassage.push(searchInfo);
					previousPage = { messageInfo: lastMassage, foundQty: foundQty };
					// return nextPage;
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
					buildHistoryMessageBox(fullInfo, secondDivTop);
				} else {
					buildFriendHistoryMessageBox(fullInfo, secondDivTop);
				}
			}
		} else {
			let secondDivTop = document.createElement("div");
			divEnd.prepend(secondDivTop);
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
					buildHistoryMessageBox(fullInfo, secondDivTop);
				} else {
					buildFriendHistoryMessageBox(fullInfo, secondDivTop);
				}
			}
			previousPage = undefined;
		}
	}
}

async function buildHistoryNextPageReload(roomID, clickedTime, divEnd) {
	let apiUrl = `/api/load_search/${roomID}/${clickedTime}`;
	let method = "GET";
	let response = await fetch(apiUrl, {
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
		let historyTime = historyInfo[data].time;
		let stringTime = historyTime.toString();
		hr = stringTime.slice(8, 10);
		min = stringTime.slice(10, 12);
		let messageTimg = hr + ":" + min;
		time.push(messageTimg);
		fullTime.push(historyTime);
		let allHistory = historyInfo[data].history;
		history.push(allHistory);
	}
	let foundQty = time.length;
	let lastMassage = [];
	if (foundQty == 21) {
		for (let length = 1; length < foundQty - 1; length++) {
			let perImg = img[length];
			let perFullTime = fullTime[length];
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
			if (length == 19) {
				let searchInfo = { time: perFullTime, history: perHistory };
				lastMassage.push(searchInfo);
				nextPage = { messageInfo: lastMassage, foundQty: foundQty };
				return nextPage;
			}
		}
	} else {
		for (let length = 1; length < foundQty; length++) {
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
	}
	nextPage = { messageInfo: lastMassage, foundQty: foundQty };
	return nextPage;
}

async function loadNextPage(nextPageInfo, roomID) {
	messageQty = nextPageInfo["foundQty"];
	let chatRoomDiv = document.querySelector(".chattingRoom--content");
	let extendDiv = document.createElement("div");
	if (extendDiv.id != "build") {
		extendDiv.id = "build";
		chatRoomDiv.appendChild(extendDiv);
		divEnd = extendDiv;
		let divBottom = document.createElement("div");
		chatRoomDiv.appendChild(divBottom);
		divBottom.className = "divEnd";
		let options = {
			root: null,
			// document.querySelector(".siteOuter"),
			rootmargin: "-5px",
			threshold: 0.05,
		};
		const observer = new IntersectionObserver(endChat, options);
		const target = divBottom;
		observer.observe(target);
		let loadMore = true;
		function endChat(entries, ob) {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					if (loadMore == true) {
						if (messageQty == 21) {
							loadMore = true;
						} else {
							loadMore = false;
						}
						let time = nextPageInfo["messageInfo"]["0"]["time"];
						nextPageInfo = await buildHistoryNextPageReload(
							roomID,
							time,
							divEnd
						);
						messageQty = nextPageInfo["foundQty"];
					} else {
						ob.unobserve(target);
					}
				}
			});
		}
	} else {
		let options = {
			root: null,
			rootmargin: "-5px",
			threshold: 0.05,
		};
		const observer = new IntersectionObserver(endChat, options);
		const target = divBottom;
		observer.observe(target);
		function endChat(entries, ob) {
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					if (messageQty == 21) {
						let time = nextPageInfo["messageInfo"]["time"];
						await buildHistoryNextPageReload(roomID, time, divEnd);
					} else {
						ob.unobserve(target);
					}
				}
			});
		}
	}
}

async function buildHistoryNextPage(roomID, clickedTime, divEnd, url) {
	let chatroomContnet = document.querySelector(".chattingRoom--content");
	let topDiv = document.createElement("div");
	chatroomContnet.appendChild(topDiv);
	let topExtendDiv = document.createElement("div");
	chatroomContnet.appendChild(topExtendDiv);
	topExtendDiv.id = "top__extend__div";
	let apiUrl = `/api/load_search/${roomID}/${clickedTime}`;
	let method = "GET";
	let response = await fetch(apiUrl, {
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
		let historyTime = historyInfo[data].time;
		let stringTime = historyTime.toString();
		hr = stringTime.slice(8, 10);
		min = stringTime.slice(10, 12);
		let messageTimg = hr + ":" + min;
		time.push(messageTimg);
		fullTime.push(historyTime);
		let allHistory = historyInfo[data].history;
		history.push(allHistory);
	}
	let foundQty = time.length;
	let lastMassage = [];
	if (foundQty == 21) {
		for (let length = 0; length < foundQty - 1; length++) {
			let perImg = img[length];
			let perFullTime = fullTime[length];
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
			if (length == 19) {
				let searchInfo = { time: perFullTime, history: perHistory };
				lastMassage.push(searchInfo);
				nextPage = { messageInfo: lastMassage, foundQty: foundQty };
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
	}
	nextPage = { messageInfo: lastMassage, foundQty: foundQty };
	let options = {
		root: null,
		// document.querySelector(".siteOuter"),
		rootmargin: "-5px",
		threshold: 0.05,
	};
	const observer = new IntersectionObserver(topChat, options);
	const target = topDiv;
	observer.observe(target);
	let flag = false;
	function topChat(entries, ob) {
		entries.forEach(async (entry) => {
			if (entry.isIntersecting) {
				if (flag == false) {
					let url = `/api/search_load_earlier_data/${roomID}/${fullTime[0]}`;
					let firstDiv = chatroomContnet.childNodes[2];
					let value = firstDiv.offsetTop;
					await buildSearchPrevioudPage(roomID, fullTime[0], topExtendDiv, url);
					flag = true;
					chatroomContnet.scrollTop = firstDiv.offsetTop - value;
				} else {
					if (previousPage == undefined) {
						ob.unobserve(target);
					} else {
						let messageQty = previousPage["foundQty"];
						if (messageQty == 21) {
							let time = previousPage["messageInfo"][0]["time"];
							let url = `/api/search_load_earlier_data/${roomID}/${time}`;
							let firstDiv = chatroomContnet.childNodes[2];
							let value = firstDiv.offsetTop;
							await buildSearchPrevioudPage(roomID, time, topExtendDiv, url);
							chatroomContnet.scrollTop = firstDiv.offsetTop - value;
						} else {
							let time = previousPage["messageInfo"][0]["time"];
							let url = `/api/search_load_earlier_data/${roomID}/${time}`;
							let firstDiv = chatroomContnet.childNodes[2];
							let value = firstDiv.offsetTop;
							await buildSearchPrevioudPage(roomID, time, topExtendDiv, url);
							chatroomContnet.scrollTop = firstDiv.offsetTop - value;
							ob.unobserve(target);
						}
					}
				}
			}
		});
	}
}
