// username
const userInput = document.querySelector(".user-input");
const userMsg = document.querySelector(".user-msg");
// password
const passInput = document.querySelector(".pass-input");
const passMsg = document.querySelector(".pass-msg");
// login
const loginBtn = document.querySelector(".login-btn");
const loginMsg = document.querySelector(".login-msg");

// functions & conditions
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //   variables
  const userValue = userInput.value;
  const passValue = passInput.value;
  let ifSendData = true;
  //   username handling
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i.test(userValue)) {
    userMsg.innerText = "Please enter a valid Email !";
    userMsg.classList.add("invalid");
    ifSendData = false;
  } else {
    userMsg.innerText = "";
    userMsg.classList.remove("invalid");
    ifSendData = true;
  }
  //   password handling
  if (passValue.length === 0) {
    passMsg.innerText = "Please enter a password";
    passMsg.classList.add("invalid");
    ifSendData = false;
  } else if (passValue.startsWith(" ")) {
    passMsg.innerText = "Password cant start with space !";
    passMsg.classList.add("invalid");
    ifSendData = false;
  } else if (passValue.length < 6) {
    passMsg.innerText = "Password is too short";
    passMsg.classList.add("invalid");
    ifSendData = false;
  } else {
    passMsg.innerText = "";
    passMsg.classList.remove("invalid");
  }
  //   equal username & password
  if (userValue == passValue) {
    alert("Username and password cant be equal !");
    ifSendData = false;
  }
  //   true conditions
  if (ifSendData) {
    const body = JSON.stringify({
      Username: userValue,
      Password: passValue,
    });
    const headers = {
      "Content-type": "application/json; charset=UTF-8",
    };
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "Post",
      body: body,
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        loginMsg.innerText = "You Signed in successfully";
        loginMsg.classList.add("valid");
      }
    });
  }
});
