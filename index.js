require('dotenv').config();
const express = require('express');

const app = express();

const userRouter = require('./Server/Routes/user');

app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});