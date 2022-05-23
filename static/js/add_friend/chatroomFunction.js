let searchFriendBoxOuter = document.querySelector(
	".room--personSection__emailOuter"
);

//friendAddIconBox click event, add friend in db
async function addFriendInDB(info, searchFriendBox) {
	let friendNamespace = info["data"]["user_namespace"];
	let url = `/api/usr`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	if (statusCode["message"]) {
		location.href = `/`;
	} else {
		userNamespace = statusCode["data"]["user_namespace"];
		let url = `/api/usr_namespace`;
		let accessMethod = "POST";
		let fetchInfo = await fetch(url, {
			headers: { "Content-Type": "application/json" },
			method: accessMethod,
			body: JSON.stringify({
				user1: userNamespace,
				user2: friendNamespace,
			}),
		});
		let response = await fetchInfo.json();
		if (response["ok"]) {
			searchFriendBox.innerHTML = "Finish  Adding";
		} else {
			console.log("error");
		}
	}
}

//searched friend and build friend info
function buildSearchEmailContent(statusCode) {
	let friendImg = statusCode["data"]["img"];
	let friendName = statusCode["data"]["name"];
	// let searchFriendBoxOuter = document.querySelector(
	// 	".room--personSection__emailOuter"
	// );
	searchFriendBoxOuter.style.display = "block";
	searchFriendBoxOuter.innerHTML = "";
	let searchFriendBox = document.createElement("div");
	searchFriendBox.className = "room--personSection__email";
	let friendImgBox = document.createElement("img");
	friendImgBox.src = friendImg;
	friendImgBox.className = "room--personSection__emailImg";
	let friendNameBox = document.createElement("div");
	friendNameBox.className = "room--personSection__emailName";
	friendNameBox.innerHTML = friendName;
	let friendAddIconBox = document.createElement("img");
	friendAddIconBox.className = "room--personSection__emailAdd";
	friendAddIconBox.src = "/static/img/add-2.png";
	searchFriendBoxOuter.appendChild(searchFriendBox);
	searchFriendBox.appendChild(friendImgBox);
	searchFriendBox.appendChild(friendNameBox);
	searchFriendBox.appendChild(friendAddIconBox);
	friendAddIconBox.addEventListener("click", function () {
		addFriendInDB(statusCode, searchFriendBox);
	});
}

//cannot find friend
function buildUserUnknow() {
	searchFriendBoxOuter.style.display = "block";
	searchFriendBoxOuter.innerHTML = "";
	let searchFriendBox = document.createElement("div");
	searchFriendBox.className = "room--personSection__email";
	searchFriendBoxOuter.appendChild(searchFriendBox);
	searchFriendBox.innerHTML = "User unknow";
}
