// let thisId = localStorage.getItem("userId");

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
		buildUserInfo(username, userImg, userNamespace);
		localStorage.setItem("userNS", userNamespace);
		localStorage.setItem("userName", username);
		localStorage.setItem("userImg", userImg);
		return username, userImg, userNamespace;
	}
}

get_user_info();
