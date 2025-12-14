const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Post (
    PostID INT NOT NULL AUTO_INCREMENT,
    UserID INT NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Body TEXT NOT NULL,
    CONSTRAINT postPK PRIMARY KEY(PostID),
    CONSTRAINT fkUser FOREIGN KEY(UserID) REFERENCES User(UserID)
  );`;
  await con.query(sql);
}

createTable();

// Check if post exists
async function postExists(post) {
  let sql = `SELECT * FROM Post WHERE Title = ? AND UserID = ?`;
  return await con.query(sql, [post.Title, post.UserID]);
}

// CREATE
async function createPost(post) {
  let cPost = await postExists(post);
  if (cPost.length > 0) throw Error("Post with this title already exists for this user.");

  let sql = `INSERT INTO Post (UserID, Title, Body) VALUES (?, ?, ?)`;
  await con.query(sql, [post.UserID, post.Title, post.Body]);

  return await getPostByTitle(post);
}

// READ
async function getPostByTitle(post) {
  let sql = `SELECT * FROM Post WHERE Title = ? AND UserID = ?`;
  let result = await con.query(sql, [post.Title, post.UserID]);
  if (result.length === 0) throw Error("Post not found.");
  return result[0];
}

// UPDATE
async function updatePostBody(post) {
  let cPost = await postExists(post);
  if (cPost.length === 0) throw Error("Post does not exist.");

  let sql = `UPDATE Post SET Body = ? WHERE Title = ? AND UserID = ?`;
  await con.query(sql, [post.Body, post.Title, post.UserID]);

  return await getPostByTitle(post);
}

// DELETE
async function deletePost(post) {
  let cPost = await postExists(post);
  if (cPost.length === 0) throw Error("Post does not exist.");

  let sql = `DELETE FROM Post WHERE Title = ? AND UserID = ?`;
  await con.query(sql, [post.Title, post.UserID]);

  return { message: "Post deleted successfully." };
}

//Get all posts
async function getAllPosts() {
  let sql = `
    SELECT Post.PostID, Post.Title, Post.Body, User.Username
    FROM Post
    JOIN User ON Post.UserID = User.UserID
  `;
  return await con.query(sql);
}

//Get all posts by a specific user
async function getPostsByUser(userId) {
  let sql = `SELECT * FROM Post WHERE UserID = ?`;
  return await con.query(sql, [userId]);
}

module.exports = { createPost, updatePostBody, getPostByTitle, deletePost, getAllPosts, getPostsByUser};
