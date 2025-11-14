let registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", register);

console.log(registrationForm)

class User {
  constructor(firstname, lastname, username, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

function validatePassword(password) {
  return password.length >= 6;
}

function register(e) {
  e.preventDefault();

  const passwd = document.getElementById("passwd").value;
  const confirmPasswd = document.getElementById("confirmpasswd").value;

  if (!validatePassword(passwd)) {
    alert("Invalid password. Please try again.");
    return;
  }

  if (passwd !== confirmPasswd) {
    alert("Passwords do not match!");
    return;
  }

  const registerUser = {
    firstname: document.getElementById("Firstname").value,
    lastname: document.getElementById("Lastname").value,
    username: document.getElementById("Username").value,
    email: document.getElementById("userEmail").value,
    password: passwd
  };

  const newUser = new User(
    registerUser.firstname,
    registerUser.lastname,
    registerUser.username,
    registerUser.email,
    registerUser.password
  );

  console.log("New Registered User:", newUser);
}