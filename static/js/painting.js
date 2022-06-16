let paintPen = document.querySelector(".messageBar---tool__round");
paintPen.addEventListener("click", openPainting);
let flag = false;
let paintDiv = document.querySelector(".chattingRoom--content__painting");
let color = document.querySelector(".brushes__box__color");
let colorBar = document.querySelector(".content__painting__color");
let exit = document.querySelector(".brushes__box__exit");
// let toolItem = null;

let currentColor = {
	color: "black",
};
let toolType = "pencil";
let pencilIcon = document.querySelector(".brushes__box__pencilImg");
pencilIcon.addEventListener("click", choosePencil);
let eraserIcon = document.querySelector(".brushes__box__eraser");
eraserIcon.addEventListener("click", chooseEraser);
let colorFlag = false;

//choose pencil
function choosePencil() {
	toolType = "pencil";
	// pencilIcon.
	pencilIcon.classList.add("usePencil");
	eraserIcon.classList.remove("choose__eraser");
}

//choose eraser
function chooseEraser() {
	toolType = "eraser";
	pencilIcon.classList.remove("usePencil");
	eraserIcon.classList.add("choose__eraser");
}
//open painting box
function openPainting() {
	if (flag === false) {
		paintDiv.style.display = "block";
		flag = true;
		toolBox.style.display = "none";
		startDraw();

		// openToolBar();
	} else {
		flag = false;
		paintDiv.style.display = "none";
	}
}
//choose exit
exit.addEventListener("click", exitCanvas);
function exitCanvas() {
	flag = false;
	paintDiv.style.display = "none";
}

//打開畫筆色庫
color.addEventListener("click", openColorBar);
function openColorBar() {
	if (colorFlag == false) {
		colorBar.style.display = "grid";
		colorFlag = true;
	} else {
		colorBar.style.display = "none";
		colorFlag = false;
	}
}

//open color box
function openToolBar() {
	color.addEventListener("click", openColorBar);
	function openColorBar() {
		colorBar.style.display = "block";
	}
}
// choose color
colorBar.addEventListener("click", selectColor);
function selectColor(e) {
	let chosenColor = e.target.value;
	color.style.backgroundColor = chosenColor;
	currentColor = {
		color: `${chosenColor}`,
	};
	colorBar.style.display = "none";
	colorFlag = false;
}

//canvas
function startDraw() {
	// window.onload = function () {

	let charFriend = document.querySelector(".chattingRoom--chatPerson__name");
	let roomID = charFriend.id;
	let savePic = document.querySelector(".brushes__box__lineImg");
	let canvas = document.querySelector("#paint-canvas");
	savePic.addEventListener("click", function () {
		savePic.setAttribute("download", "img.png");
		let saveImg = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		window.location.href = saveImg;
	});

	let socketChat = io("/talk");
	socketChat.emit("join", {
		roomID: roomID,
	});
	console.log(roomID);

	let context = canvas.getContext("2d");
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);
	// let boundings = canvas.getBoundingClientRect();
	let mouseX = 0;
	let mouseY = 0;
	context.strokeStyle = "black";
	context.lineWidth = 5;
	context.lineJoin = "round";
	context.lineCap = "round";
	// context.translate(0.5, 0.5);
	let isDrawing = false;

	function setMousePosition(e) {
		mouseX = e.offsetX;
		mouseY = e.offsetY;
	}

	//mouse down event
	canvas.addEventListener("mousedown", function (e) {
		setMousePosition(e);
		isDrawing = true;
		context.beginPath();
		context.moveTo(mouseX, mouseY);
	});

	//mouse move event
	canvas.addEventListener("mousemove", function (e) {
		if (isDrawing == true) {
			// e.preventDefault();
			drawLine(e);
			mouseX = e.offsetX;
			mouseY = e.offsetY;
		}
		return;
	});
	//mouse up event
	canvas.addEventListener("mouseup", function (e) {
		setMousePosition(e);
		isDrawing = false;
	});

	// mouse out canvas
	canvas.addEventListener("mouseout", function (e) {
		e.preventDefault();
		isDrawing = false;
	});

	function drawLine(e) {
		if (toolType == "pencil") {
			context.moveTo(mouseX, mouseY);
			context.lineTo(e.offsetX, e.offsetY);
			context.strokeStyle = currentColor.color;
			context.closePath();
			context.stroke();

			// 發送 socket 訊息
			let drawInfo = {
				originalX: mouseX,
				originalY: mouseY,
				destinationX: e.offsetX,
				destinationY: e.offsetY,
			};
			// socketChat.emit("connection1", () => {
			socketChat.emit("draw", {
				drawInfo: drawInfo,
				lineColor: currentColor.color,
				roomDetail: roomID,
				// userInfo: currentUserDetail,
			});
			// });
		} else {
			context.moveTo(mouseX, mouseY);
			context.clearRect(mouseX, mouseY, 15, 15);
			// socketChat.emit("connection2", () => {
			socketChat.emit("erase", {
				clearPositionX: mouseX,
				clearPositionY: mouseY,
				roomDetail: roomID,
			});
			// });
		}
	}
	let broom = document.querySelector(".brushes__box__clearImg");
	broom.addEventListener("click", clearAll);

	//clear
	function clearAll() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		// socketChat.emit("connection3", () => {
		socketChat.emit("clearDraw", { roomDetail: roomID });
	}
	socketChat.on("clearDrawData", (clearDraw) => {
		if (clearDraw) {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
	});

	socketChat.on("showDrawData", (drawData) => {
		// 把使用者原本的筆觸跟顏色存起來
		let positionX;
		let positionY;
		context.save();
		context.strokeStyle = drawData.lineColor;
		context.beginPath();

		positionX = drawData.drawInfo.originalX;
		positionY = drawData.drawInfo.originalY;
		// console.log(typeof drawData.lineColor);
		context.moveTo(positionX, positionY);
		context.lineTo(
			drawData.drawInfo.destinationX,
			drawData.drawInfo.destinationY
		);
		context.closePath();
		context.stroke();
		context.restore();
	});

	socketChat.on("eraseDrawData", (eraseInfo) => {
		context.save();
		context.moveTo(eraseInfo.clearPositionX, eraseInfo.clearPositionY);
		context.clearRect(
			eraseInfo.clearPositionX,
			eraseInfo.clearPositionY,
			15,
			15
		);
		context.restore();
	});
}
