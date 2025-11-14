let postForm = document.getElementById("postForm");
    postForm.addEventListener("submit", submitPost);

console.log(postForm)

  class Post {
    constructor(content) {
      this.content = content;
    }
  }

  function submitPost(e) {
    e.preventDefault();

    const content = document.getElementById("post").value;

    if (!content) {
      alert("Please enter a post before submitting.");
      return;
    }

    const newPost = new Post(content);
    console.log("New Post Created:", newPost);
  }