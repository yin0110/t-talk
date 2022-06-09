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
