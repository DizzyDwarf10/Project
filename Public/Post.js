const postForm = document.getElementById("postForm");

if (postForm) {
  postForm.addEventListener("submit", submitPost);
}

class Post {
  constructor(userId, title, body) {
    this.UserID = userId;
    this.Title = title;
    this.Body = body;
  }
}

async function submitPost(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("post").value.trim();
  const userId = localStorage.getItem("userId"); // use logged-in user ID

  if (!title || !body) {
    alert("Please fill out both fields.");
    return;
  }

  const newPost = new Post(userId || 1, title, body); // fallback to 1 if no user logged in

  try {
    const response = await fetch("http://localhost:3000/posts/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const savedPost = await response.json();
    console.log("Post saved:", savedPost);

    window.location.href = "Home.html";

    postForm.reset();
  } catch (err) {
    alert("Error creating post: " + err.message);
    console.error(err);
  }
}