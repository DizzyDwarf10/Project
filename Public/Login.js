let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", login);

    function validatePassword(password) {
      return password.length >= 6;
  }
  
console.log(loginForm)

function login(e) {
  e.preventDefault();
  userEmail = document.getElementById("userEmail").value;
  passwd = document.getElementById("passwd").value;

if(validatePassword(passwd)){

  console.log("Password is valid.");

  const loginUser = {
    email: document.getElementById("userEmail").value,
    password: passwd
  };
}
else {
  alert("Invalid password. Please try again.");
}
}
