let messageTool = document.querySelector(".messageBar__tool");
let toolBox = document.querySelector(".messageBar---tool__content");
messageTool.addEventListener("click", openToolBox);
let toolFlag = false;
function openToolBox() {
	if (toolFlag == false) {
		toolBox.style.display = "flex";
		toolFlag = true;
	} else {
		toolBox.style.display = "none";
		toolFlag = false;
	}
}

let searchFriendInput = document.querySelector(".personSection__search__input");
searchFriendInput.addEventListener("keyup", searchList);
function searchList() {
	let filter = searchFriendInput.value.toUpperCase();
	let li = document.querySelector(".room--personSection__chatInfoOuter");
	if (li.childNodes[0].className == "room--personSection__chatInfo__user") {
		for (i = 2; i < li.childNodes.length; i++) {
			a = li.childNodes[i].childNodes[1];
			txtValue = a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li.childNodes[i].style.display = "";
			} else {
				li.childNodes[i].style.display = "none";
			}
		}
	} else {
		for (i = 0; i < li.childNodes.length; i++) {
			a = li.childNodes[i].childNodes[1];
			txtValue = a.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				li.childNodes[i].style.display = "";
			} else {
				li.childNodes[i].style.display = "none";
			}
		}
	}
}
