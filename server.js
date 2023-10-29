const express = require("express")    
const User = require('./model/user')                                        

const app = express()
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.static("public"));

const jwt = require('jsonwebtoken');
const PORT = 4000   

const connectDB = require("./db");
//Connecting the Database

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`),
)
connectDB()

app.use(bodyParser.json());
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

app.use(express.json());
app.use("/api/auth", require("./Auth/Route"));


app.use((req, res, next) => {
    const rawData = req.body.toString(); 
    console.log('Request Data:', rawData);
    next();
  });

const { adminAuth, userAuth } = require("./middleware/auth.js");

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userAuth, (req, res) => res.send("User Route"));

app.set("view engine", "ejs");


app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
  })
app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))

app.get("/basic", userAuth, (req, res) => res.render("user"))

app.get('/start', (req, res) => {
  res.render('start'); 
});

//Create and Join Room

const http = require('http');
const socketIo = require('socket.io');
const e = require("express");

const io = socketIo(server);

const rooms = new Map();

function createRoom(roomCode) {
    rooms.set(roomCode, { players: [] });
}

function joinRoom(roomCode, playerId) {
    const room = rooms.get(roomCode);
    if (room) {
        room.players.push(playerId);
    }
}


const players = {}
const comments = []
const names = ["laxmi", "kantabai", "Gangubai" , "baburao", "Shyam", "Sunudar"]

let angle=0;
let i=0;

app.get("/game", (req,res) => {
    res.render("game.ejs");
})

io.on('connection', (socket) => {
    console.log('a user connected')
    players[socket.id] = {
        name: names[i]
    }
    i++;
    console.log(players)
    
    io.emit('updatePlayers', players)

    socket.on('disconnect' , (reason) => {
        console.log(reason)
        delete players[socket.id]
        io.emit('updatePlayers', players)
    })

    socket.on('Spin', () => {
        angle = angle + 2 * 360 + (Math.floor(Math.random()*10))*(120);
        var id = ((angle%360)/60)+1;
        console.log(id);
        io.emit('Spinning', ({angle:angle}));
    })

    socket.on('message', (text) => {
        console.log(text)
        comments.push(text);
        io.emit("updateChat",comments)
        console.log(comments)
    })

    socket.on('createRoom', (roomCode) => {
        if (!rooms.has(roomCode)) {
            createRoom(roomCode);
            socket.join(roomCode);
            socket.emit('roomCreated', roomCode);
        } else {
            socket.emit('roomExists', roomCode);
        }
    });

    socket.on('joinRoom', (roomCode, playerId) => {
        const room = rooms.get(roomCode);
        if (room) {
            socket.join(roomCode);
            socket.emit('roomJoined', roomCode);
            room.players.push(playerId);
            io.to(roomCode).emit('playerJoined', playerId);
        } else {
            socket.emit('roomNotFound', roomCode);
        }
});

})



