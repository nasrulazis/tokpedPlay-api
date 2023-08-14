require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const cookieParser = require ('cookie-parser')
const cors = require('cors');
const {Server} = require('socket.io')
const { createServer } = require("http");
const { requireAuth } = require('./app/middleware/authMiddleware');
const videoRoutes = require ('./app/routes/videoRoutes')
const userRoutes = require ('./app/routes/userRoutes');
const productRoutes = require ('./app/routes/productRoutes')
const commentRoutes = require ('./app/routes/commentRoutes')

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGIN
    }
})

io.on('connection', (socket) => {
    console.log("connection ready");
    socket.on('from-client', (data) => {
        socket.broadcast.emit('from-server', data);
    });
    socket.on('disconnect', (socket) => {
        console.log("user left")
    })
})

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true, 
    };
app.use(cors(corsOptions));

// database connection
const mongoStringUrl = process.env.DATABASE_URL;

mongoose.connect(mongoStringUrl)
    .then((result) => httpServer.listen(3000))
    .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }), 
);
app.use(cookieParser())

app.use('/api/user',userRoutes);
app.use('/api/video',requireAuth ,videoRoutes);
// app.use('/api/video', videoRoutes);
app.use('/api/product',requireAuth ,productRoutes);
app.use('/api/comment',requireAuth ,commentRoutes);
