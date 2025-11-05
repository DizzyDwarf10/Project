let loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", login);
    e.preventDefault();

      const userEmail = document.getElementById("userEmail").value;
      const passwd = document.getElementById("passwd").value;

      const loginUser = {
        email: userEmail,
        password: passwd
      };

      console.log("Login Attempt:", loginUser);

let registrationForm = document.getElementById("registrationForm");
    registrationForm.addEventListener("submit", register);
    e.preventDefault();

      const firstname = document.getElementById("Firstname").value;
      const lastname = document.getElementById("Lastname").value;
      const username = document.getElementById("Username").value;
      const email = document.getElementById("userEmail").value;
      const password = document.getElementById("passwd").value;
      const confirmPassword = document.getElementById("confirmpasswd").value;

    function validatePasswords(password, confirmPassword) {
        alert("Passwords do not match!");
        return password === confirmPassword;
    }
    const newUser = new User(firstname, lastname, username, userEmail, passwd);
    console.log("New Registered User:", newUser);
