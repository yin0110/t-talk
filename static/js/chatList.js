let chatIcon = document.querySelector(".nav--functionbar__chatting");
let friendSection = document.querySelector(
	".room--personSection__chatInfoOuter"
);

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
			buildChatFriendList(friendInfo);
			Array.from(
				document.querySelectorAll(".room--personSection__chatInfo")
			).forEach((element) => {
				element.addEventListener("click", (e) => {
					buildChatRoom(e);
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
// 	let url = `/api/usr_friends?namespace=${userNamespace}&username=${userName}`;
// 	let accessMethod = "GET";
// 	let fetchInfo = await fetch(url, {
// 		method: accessMethod,
// 	});
// 	let response = await fetchInfo.json();
// 	if (response["data"]) {
// 		let friendInfo = response["data"];
// 		buildChatFriendList(friendInfo);
// 		Array.from(
// 			document.querySelectorAll(".room--personSection__chatInfo")
// 		).forEach((element) => {
// 			element.addEventListener("click", (e) => {
// 				buildChatRoom(e);
// 			});
// 		});
// 	} else {
// 		console.log("error");
// 		let friendSection = document.querySelector(
// 			".room--personSection__chatInfoOuter"
// 		);
// 		friendSection.innerHTML = "";
// 	}
// }

chatIcon.addEventListener("click", showChatList);
async function showChatList() {
	search.style.display = "block";
	searchFriendTitle.style.display = "none";
	chatFriends.style.display = "block";
	searchFriend.style.display = "none";
	searchFriendBoxOuter.style.display = "none";
	await showChatFriends();
}
