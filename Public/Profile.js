document.addEventListener("DOMContentLoaded", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const profileName = document.getElementById("profileName");
  profileName.textContent = `${user.Username}'s Profile`;

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "Login.html";
    });
  }

  try {
    const response = await fetch("http://localhost:3000/posts/user/" + user.UserID);
    if (!response.ok) {
      throw new Error("Failed to load posts");
    }
    const posts = await response.json();
    renderPosts(posts);
  } catch (err) {
    console.error(err);
    document.getElementById("postsContainer").innerHTML =
      "<p>Error loading posts.</p>";
  }
});

function renderPosts(posts) {
  const container = document.getElementById("postsContainer");
  container.innerHTML = "";

  if (!posts.length) {
    container.innerHTML = "<p>You haven't posted anything yet.</p>";
    return;
  }

  posts.forEach(post => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
      <h3>${post.Title}</h3>
      <p>${post.Body}</p>
    `;

    container.appendChild(postDiv);
  });
}