//friendAddIconBox click event, add friend in db
async function addFriendInDB(statusCode) {
	let friendNamespace = statusCode["data"]["user_namespace"];
	let userNamespace = localStorage.getItem("userNS");
}

//searched friend and build friend info
function buildSearchEmailContent(statusCode) {
	let friendImg = statusCode["data"]["img"];
	let friendName = statusCode["data"]["name"];
	let searchFriendBoxOuter = document.querySelector(
		".room--personSection__emailOuter"
	);
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
		addFriendInDB(statusCode);
	});
}

//cannot find friend
function buildUserUnknow() {
	let searchFriendBoxOuter = document.querySelector(
		".room--personSection__emailOuter"
	);
	searchFriendBoxOuter.innerHTML = "";
	let searchFriendBox = document.createElement("div");
	searchFriendBox.className = "room--personSection__email";
	searchFriendBoxOuter.appendChild(searchFriendBox);
	searchFriendBox.innerHTML = "User unknow";
}
