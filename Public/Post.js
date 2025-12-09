let postForm = document.getElementById("postForm");
    postForm.addEventListener("submit", submitPost);

console.log(postForm)

  if (postForm) {
    postForm.addEventListener("submit", submitPost);
  }

  class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
  }
}

  function submitPost(e) {
    e.preventDefault();
    
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("post").value.trim();

    if (!title) {
      alert("Please enter a title before submitting.");
      return;
    }

    if (!content) {
      alert("Please make a post before submitting.");
      return;
    }

    const newPost = new Post(title, content);
    console.log("New Post Created:", newPost);
  }
