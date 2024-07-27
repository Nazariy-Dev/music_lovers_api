require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const authRouter = require('./router/user-router')
const songsRouter = require('./router/songs-router')
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(express.json());

app.use(cookieParser());

// we need cors to send request from frowser with no problems
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', authRouter);
app.use('/api', songsRouter);

// Errors middleware should be in the end
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        app.listen(PORT, () => console.log(`Server Started on ${process.env.API_URL}`))
    } catch (e) {
        console.log(e);
    }
}

start()
