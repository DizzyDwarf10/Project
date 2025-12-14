async function loadPosts() {
  try {
    const response = await fetch("http://localhost:3000/posts/getPosts");
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(displayPost);
  } catch (err) {
    console.error("Error loading posts:", err);
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = `<p style="color:red;">Failed to load posts: ${err.message}</p>`;
  }
}

function displayPost(post) {
  const postsContainer = document.getElementById("posts");
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.innerHTML = `<h3>${post.Title}</h3><p>${post.Body}</p>`;
  postsContainer.appendChild(postDiv);
}

window.onload = loadPosts;