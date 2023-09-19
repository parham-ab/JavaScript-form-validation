// username
const userInput = document.querySelector(".user-input");
const userMsg = document.querySelector(".user-msg");
// password
const passInput = document.querySelector(".pass-input");
const passMsg = document.querySelector(".pass-msg");
const passwordToggle = document.querySelector(".password-toggle");
// icon
const showPassIcon = document.querySelector(".fa-eye-slash");
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
    userMsg.classList.add("animate__animated", "animate__shakeX");
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
    passMsg.classList.add("animate__animated", "animate__shakeX");
    showPassIcon.classList.replace(
      "password-toggle",
      "password-toggle-hasError"
    );
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
    // alert("Username and password cant be equal !");
     // swal toast
     const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "error",
      title: "Username and password cant be equal !",
    });
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
        loginMsg.innerText = "You Logged in successfully";
        loginMsg.classList.add("valid");
        loginMsg.classList.add("animate__animated", "animate__backInDown");
        // swal toast
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Logged in successfully",
        });
      }
    });
  }
});
// Add a click event listener to the password toggle icon
passwordToggle.addEventListener("click", function () {
  // Toggle the password field's type attribute between "password" and "text"
  if (passInput.type === "password") {
    passInput.type = "text";
    passwordToggle.classList.remove("fa-eye-slash");
    passwordToggle.classList.add("fa-eye");
  } else {
    passInput.type = "password";
    passwordToggle.classList.remove("fa-eye");
    passwordToggle.classList.add("fa-eye-slash");
  }
});
// ------------
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});