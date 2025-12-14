const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", login);
}

function validatePassword(password) {
  return password.length >= 6;
}

async function login(e) {
  e.preventDefault();

  const email = document.getElementById("userEmail").value.trim();
  const passwd = document.getElementById("passwd").value.trim();

  if (!validatePassword(passwd)) {
    alert("Invalid password. Please try again.");
    return;
  }

  const loginUser = {
    Email: email,
    Password: passwd
  };

  try {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const user = await response.json();
    console.log("Login successful:", user);

    // Store UserID for posts
    localStorage.setItem("userId", user.UserID);

    // Redirect to homepage
    window.location.href = "Post.html";
  } catch (err) {
    alert("Login failed: " + err.message);
    console.error(err);
  }
}