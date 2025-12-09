const express = require("express")
const User = require("../Model/user")
const router = express.Router()

router
.get('/getUsers', async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.send(users)
  } catch(err) {
  console.error("Get Users error:", err);
  res.status(401).send({message: err.message});
}
})

.post('/login', async (req, res) => {
  try {
    let user = await User.login(req.body)
    res.send({...user, Password: undefined})
  } catch(err) {
  console.error("Login error:", err);
  res.status(401).send({message: err.message});
}
})

.post('/register', async(req, res) => {
  try {
    let user = await User.register(req.body)
    res.send({...user, Password: undefined})
 } catch(err) {
  console.error("Register error:", err);
  res.status(401).send({message: err.message});
}
})

.put('/update', async(req, res) => {
  try {
    let user = await User.updateEmail(req.body)
    res.send({...user, Password: undefined})
} catch(err) {
  console.error("Update error:", err);
  res.status(401).send({message: err.message});
}
})

.delete('/delete', async(req, res) => {
  try {
    let user = await User.deleteAccount(req.body)
    res.send({success: "We will miss you! :("})
} catch(err) {
  console.error("Delete error:", err);
  res.status(401).send({message: err.message});
}
})

module.exports = router