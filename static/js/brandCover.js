let chatRoomMessageBox = document.querySelector(".chattingRoom--chatBox");
let brandCover = document.querySelector(".brand--logo");
let loadPage = document.querySelector(".loading__page");
let loadImg = document.querySelector(".load__img");

function showChatRoom() {
	chatRoomMessageBox.style.display = "block";
	brandCover.style.display = "none";
}
loadPage.display = "none";
// setTimeout(() => {
// 	loadPage.style.display = "none";
// }, "2000");

const button = document.querySelector(".messageBar__emoji");

const picker = new EmojiButton();
picker.on("emoji", (emoji) => {
	document.querySelector(".messageBar__texting__input").value += emoji;
});
button.addEventListener("click", () => {
	picker.togglePicker(button);
});
