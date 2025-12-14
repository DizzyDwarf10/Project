import { fetchData } from "./main.js";

const loginForm = document.getElementById("loginForm");
if (loginForm) loginForm.addEventListener("submit", login);

function login(e) {
  e.preventDefault();

  const user = {
    username: document.getElementById("username").value.trim(),
    password: document.getElementById("pswd").value.trim()
  };

  fetchData("/user/login", user, "POST") 
    .then(data => {
      if (!data.message) {
        setCurrentUser(data);
        window.location.href = "index.html";
      } else {
        showError(data.message);
      }
    })
    .catch(err => {
      showError(err.message);
    });
}

const registerForm = document.getElementById("registerForm");
if (registerForm) registerForm.addEventListener("submit", register);

function register(e) {
  e.preventDefault();

  const pswd = document.getElementById("pswd").value.trim();
  const confirmPswd = document.getElementById("confirmPswd").value.trim();
  const h1 = document.getElementById("welcome");

  if (validPassword(pswd, confirmPswd)) {
    const user = {
      username: document.getElementById("username").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: pswd
    };

    h1.innerHTML = `Welcome ${user.username}!`;
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
  } else {
    h1.innerHTML = "Passwords must match!!";
  }

  document.getElementById("pswd").value = "";
  document.getElementById("confirmPswd").value = "";
}

function validPassword(password, confirmPassword) {
  return password === confirmPassword;
}

function showError(message) {
  const errorSection = document.getElementById("error");
  if (errorSection) errorSection.innerText = message;
}

export function setCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export function removeCurrentUser() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}