async function loadPosts() {
  try {
    const response = await fetch("http://localhost:3000/posts/getPosts");
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
    const postBox = document.createElement("div");
    postBox.className = "post-box";
    postBox.innerHTML = `
      <p class="post-user">Posted by: ${post.Username}</p>
      <h3>${post.Title}</h3>
      <p>${post.Body}</p>
    `;
    postsContainer.appendChild(postBox);
  });
  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

window.onload = loadPosts;