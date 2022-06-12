let register = document.querySelector(".login--form__register");
register.addEventListener("click", registerAccount);
let login = document.querySelector(".login--form__login");
login.addEventListener("click", loginAccount);
let userNameLable = document.querySelector(".login--form__name");
let userNameInput = document.querySelector(".login--form__nameInput");
let userPasswordInput = document.querySelector(".login--form__passwordInput");
let emailInput = document.querySelector(".login--form__emailInput");
let welcome = document.querySelector(".login--welcome");
let welcomeDetail = document.querySelector(".login--welcomeDetail");
let paddwordSetting = document.querySelector(".login--form__passwordSetting");
let loginButton = document.querySelector(".login--form__loginButton");
let signUpBotton = document.querySelector(".login--form__signupButton");
let hrText = document.querySelector(".login--form__text");
let hrDiv = document.querySelector(".login--form__hrDiv");
let form = document.querySelector(".login--form");
let socket = null;
form.addEventListener("submit", signUpOrRegister);

function registerAccount() {
	userNameLable.style.display = "block";
	userNameInput.style.display = "block";
	emailInput.style.marginBottom = "10px";
	welcome.innerHTML = "Hello   Friend !";
	welcomeDetail.innerHTML = "Welcome! Create Account Here";
	paddwordSetting.style.display = "none";
	register.style.display = "none";
	login.style.display = "block";
	loginButton.innerHTML = "Sign Up Now";
	hrText.innerHTML = "Have a good day !";
	hrDiv.style.marginTop = "16px";
}

function loginAccount() {
	userNameLable.style.display = "none";
	userNameInput.style.display = "none";
	emailInput.style.marginBottom = "21px";
	welcome.innerHTML = "Welcome Back";
	welcomeDetail.innerHTML = "Welcome back! Please enter your details";
	paddwordSetting.style.display = "flex";
	register.style.display = "block";
	login.style.display = "none";
	loginButton.innerHTML = "Login Now";
	loginButton.style.display = "block";
	hrText.innerHTML = "Have a good day !";
	hrDiv.style.marginTop = "25px";
}

async function signUpOrRegister(e) {
	let buttonNmae = loginButton.innerHTML;
	e.preventDefault();
	if (buttonNmae == "Sign Up Now") {
		let userName = userNameInput.value;
		let userEmail = emailInput.value;
		let userPassword = userPasswordInput.value;
		let formData = new FormData(form);
		formData.append("userName", userName);
		formData.append("userEmail", userEmail);
		formData.append("userPassword", userPassword);
		if (
			userEmail.search(
				/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
			) != -1
		) {
			let url = `/api/usr`;
			let accessMethod = "POST";
			let fetchInfo = await fetch(url, {
				method: accessMethod,
				body: formData,
			});
			let statusCode = await fetchInfo.json();
			if (statusCode["message"]) {
				welcomeDetail.innerHTML = "Email already existed !";
				welcomeDetail.style.color = "red";
			} else {
				loginAccount();
				welcomeDetail.innerHTML = "Sign up successfully ! Please login";
				welcomeDetail.style.color = "#00854a";
			}
		} else {
			welcomeDetail.innerHTML = "Please enter correct email !";
			welcomeDetail.style.color = "red";
		}
	} else {
		let userEmail = emailInput.value;
		let userPassword = userPasswordInput.value;
		let formData = new FormData(form);
		formData.append("userEmail", userEmail);
		formData.append("userPassword", userPassword);
		let url = `/api/usr`;
		let accessMethod = "PATCH";
		let fetchInfo = await fetch(url, {
			method: accessMethod,
			body: formData,
		});
		let statusCode = await fetchInfo.json();
		if (statusCode["data"]) {
			location.href = `/chatroom`;
		} else {
			welcomeDetail.innerHTML = "Email or password is wrong !";
			welcomeDetail.style.color = "red";
		}
	}
}
