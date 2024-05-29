const express = require('express');
const cors = require('cors');

require('dotenv').config();
// const app = express();
const connectDB = require('./config/connectDB');
const { default: mongoose } = require('mongoose');
const router = require('./routes/index');
const cookiesParser = require('cookie-parser');
const { app, server } = require('./socket');

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true 
}));

app.use(express.json());
app.use(cookiesParser());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        message: "server running at http://localhost:" + PORT
    })
})

//API endpoints
app.use('/api', router);

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log("server running at http://localhost:" + PORT);
    })
}).catch((error) => {
    console.log(error)
})

