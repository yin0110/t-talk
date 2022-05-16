let plusIcon = document.querySelector(".nav--functionbar__addperson");
let search = document.querySelector(".room--personSection__search");
let searchFriend = document.querySelector(".room--personSection__searchFriend");
let searchFriendTitle = document.querySelector(
	".room--personSection__addFriend"
);
let chatFriends = document.querySelector(".room--personSection__chatInfoOuter");
let email = document.querySelector(".personSection__search__inputFriend");
let searchFriendButton = document.querySelector(
	".personSection__searchFriend__icon"
);
let personSection = document.querySelector(".room--personSection");
plusIcon.addEventListener("click", addFriend);

//nav--functionbar add friend
function addFriend() {
	search.style.display = "none";
	searchFriendTitle.style.display = "block";
	searchFriend.style.display = "block";
	chatFriends.style.display = "none";
	let searchFriendBoxOuter = document.querySelector(
		".room--personSection__emailOuter"
	);
	searchFriendBoxOuter.innerHTML = "";
}

//personSection search friends function
searchFriendButton.addEventListener("click", searchFriendEmail);
async function searchFriendEmail() {
	let friendEmail = "/" + email.value;
	let url = `/api/usr_namespace?namespace=${friendEmail}`;
	let accessMethod = "GET";
	let fetchInfo = await fetch(url, {
		method: accessMethod,
	});
	let statusCode = await fetchInfo.json();
	if (statusCode["message"]) {
		buildUserUnknow();
	} else {
		buildSearchEmailContent(statusCode);
	}
}
