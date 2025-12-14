import { fetchData } from "./main.js"

let loginForm = document.getElementById("loginForm")
if(loginForm) loginForm.addEventListener('submit', login)

function login(e) {
  e.preventDefault()

  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("pswd").value
  }

  fetchData("/user/Login", user, "POST")
  .then(data => {
    if(!data.message) {
      setCurrentUser(data)
      window.location.href = "index.html"
    }
  })
  .catch(err => {
    let errorSection = document.getElementById("error")
    errorSection.innerText = err.message
  })
  
}  

let registerForm = document.getElementById("registerForm")

if(registerForm) registerForm.addEventListener('submit', register)

function register(e) {
  e.preventDefault()

  pswd = document.getElementById("pswd").value
  confirmPswd = document.getElementById("confirmPswd").value
  let h1 = document.getElementById("welcome")

  if(validPassword(pswd, confirmPswd)) {
    const user = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: pswd
    }

    h1.innerHTML = `Welcome ${user.username}!`
    document.getElementById("username").value=""
    document.getElementById("email").value=""
    
  } else {    
    h1.innerHTML = `Passwords must match!!`
  }
  document.getElementById("pswd").value=""
  document.getElementById("confirmPswd").value=""
}

function validPassword(password, confimPassword) {
  return password === confimPassword;
}

export function setCurrentUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user'))
}

export function removeCurrentUser() {
  localStorage.removeItem('user')
  window.location.href = "index.html"
}