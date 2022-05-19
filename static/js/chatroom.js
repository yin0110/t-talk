let thisId = localStorage.getItem("userId");

//for user icon and name 右上角（chattingRoom--user__name）
async function get_user_info() {
	let url = `/api/usr_info?user_id=${thisId}`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	if (statusCode["message"]) {
	} else {
		username = statusCode["data"]["name"];
		userImg = statusCode["data"]["img"];
		userNamespace = statusCode["data"]["user_namespace"];
		console.log(userNamespace);
		localStorage.setItem("userNS", userNamespace);
		localStorage.setItem("userName", username);
		localStorage.setItem("userImg", userImg);
		buildUserInfo(username, userImg, userNamespace);
	}
}
get_user_info();
