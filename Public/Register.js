const registrationForm = document.getElementById("registrationForm");

if (registrationForm) {
  registrationForm.addEventListener("submit", register);
}

class User {
  constructor(firstname, lastname, username, email, password) {
    this.Firstname = firstname;
    this.Lastname = lastname;
    this.Username = username;
    this.Email = email;
    this.Password = password;
  }
}

function validatePassword(password) {
  return password.length >= 6;
}

async function register(e) {
  e.preventDefault();

  const passwd = document.getElementById("passwd").value.trim();
  const confirmPasswd = document.getElementById("confirmpasswd").value.trim();

  if (!validatePassword(passwd)) {
    alert("Invalid password. Please try again.");
    return;
  }

  if (passwd !== confirmPasswd) {
    alert("Passwords do not match!");
    return;
  }

  const newUser = new User(
    document.getElementById("Firstname").value.trim(),
    document.getElementById("Lastname").value.trim(),
    document.getElementById("Username").value.trim(),
    document.getElementById("userEmail").value.trim(),
    passwd
  );

  console.log("New Registered User:", newUser);

  try {
    const regResponse = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    });

    if (!regResponse.ok) {
      const err = await regResponse.json();
      throw new Error(err.message);
    }

    console.log("Registration successful");

    const loginResponse = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: newUser.Username, Password: newUser.Password })
    });

    if (!loginResponse.ok) {
      const err = await loginResponse.json();
      throw new Error(err.message);
    }

    const user = await loginResponse.json();
    console.log("Login successful:", user);

    localStorage.setItem("userId", user.UserID);

    window.location.href = "Login.html";
  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  }
}