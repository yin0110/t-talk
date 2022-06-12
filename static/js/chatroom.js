let signOut = document.querySelector(".chattingRoom--user__arrow");
let signOutBox = document.querySelector(".signOut--tool");
let memberSignOut = document.querySelector(".signOut--box");
memberSignOut.addEventListener("click", clickSignOut);
async function get_user_info() {
	let url = `/api/usr`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	if (statusCode["message"]) {
		location.href = `/`;
	} else {
		let username = statusCode["data"]["name"];
		let userImg = statusCode["data"]["img"];
		userNamespace = statusCode["data"]["user_namespace"];
		let mainUser = document.querySelector(".chattingRoom--user__name");
		mainUser.innerHTML = username;
		// mainUser.style.marginTop = "23px";
		let mainImg = document.querySelector(".chattingRoom--user__img");
		mainImg.src = userImg;
		buildUserInfo(username, userImg, userNamespace);
	}
}

get_user_info();

let signOutFlag = false;
console.log(signOutBox);
signOut.addEventListener("click", openSignOut);
function openSignOut() {
	if (signOutFlag == false) {
		signOutBox.style.display = "block";
		signOutFlag = true;
		console.log("ok");
	} else {
		signOutBox.style.display = "none";
		signOutFlag = false;
		console.log("no");
	}
}

async function clickSignOut() {
	let url = `/api/usr`;
	let accessMethod = "DELETE";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	if (statusCode["ok"]) {
		location.href = `/`;
	}
}
