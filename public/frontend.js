// import bodyParser from "body-parser";
const socket = io();
const players = {}
const frontendComments =[]

socket.on('updatePlayers', (backendPlayers) => {
    for (const id in backendPlayers) {
        console.log(id)
        const backendPlayer = backendPlayers[id]
        if(!players[id]){
            players[id] = backendPlayer.name
        }
    }

    for (const id in players){
        if(!backendPlayers[id]){
            delete players[id]
        }
    }
    console.log(players)
})


const btn = document.querySelector('#btn')

btn.addEventListener('click', () => {
    socket.emit('Spin')
}) 

let pointer = document.querySelector('#pointer')
socket.on('Spinning', (props) => {
    pointer.style.transform = `rotate(${props.angle}deg)`;
})

const send = document.querySelector('#sendbtn')
send.addEventListener('click', () => {
    const text = document.querySelector('#comment').value
    socket.emit('message', {name:players[socket.id], text:text });
})

socket.on('updateChat', (comments) => {
    let length = comments.length
    const chatbox = document.querySelector('#chatBox')
    const newChat = comments[length-1].name+":"+comments[length-1].text; 
    const child = document.createElement('div')
    child.innerText = newChat
    chatbox.appendChild(child)
})

