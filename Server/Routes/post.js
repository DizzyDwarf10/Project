const express = require("express");
const Post = require("../Model/post"); 
const router = express.Router();

router
// READ - get all posts
.get('/getPosts', async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.send(posts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(400).send({ message: err.message });
  }
})

// CREATE - create a new post
.post('/create', async (req, res) => {
  try {
    const post = await Post.createPost(req.body);
    res.send(post);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(400).send({ message: err.message });
  }
})

// READ - get a single post by title
.post('/getPost', async (req, res) => {
  try {
    const post = await Post.getPostByTitle(req.body);
    res.send(post);
  } catch (err) {
    console.error("Get post error:", err);
    res.status(400).send({ message: err.message });
  }
})

//READ - get all posts for a specific user
.get('/user/:id', async (req, res) => {
  try {
    const posts = await Post.getPostsByUser(req.params.id);
    res.send(posts);
  } catch (err) {
    console.error("Get posts by user error:", err);
    res.status(400).send({ message: err.message });
  }
})

// UPDATE - update post body
.put('/update', async (req, res) => {
  try {
    const post = await Post.updatePostBody(req.body);
    res.send(post);
  } catch (err) {
    console.error("Update post error:", err);
    res.status(400).send({ message: err.message });
  }
})

// DELETE - delete post
.delete('/delete', async (req, res) => {
  try {
    const result = await Post.deletePost(req.body);
    res.send(result);
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;