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
		username = statusCode["data"]["name"];
		userImg = statusCode["data"]["img"];
		userNamespace = statusCode["data"]["user_namespace"];
		let mainUser = document.querySelector(".personSection__chatInfo__roomName");
		mainUser.innerHTML = username;
		mainUser.style.marginTop = "23px";
		let mainImg = document.querySelector(".personSection__chatInfo__personImg");
		mainImg.src = userImg;
		buildUserInfo(username, userImg, userNamespace);
	}
}

get_user_info();
