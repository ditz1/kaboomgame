//ditz1

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
//app.use(cors());

const io = require("socket.io")(server,  {
  cors: {
    origin: "http://localhost:8008",
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use('/static', express.static('public'));

let players = {}; // Stores player data
var playercount = 0;

io.on('connection', (socket) => {
    // Assign player number
    console.log("ws connection started: " + socket.id);
    const availableNumber = getAvailablePlayerNumber();
    players[socket.id] = { playerNumber: availableNumber };

    console.log(`Player connected: ${socket.id} as Player ${availableNumber}`);
    socket.emit('playerNumber', availableNumber);

    var playerNumber = Object.keys(players).length + 1;
    playercount++;
    console.log("players: " + playercount);
    //if (playerNumber > 2) playerNumber = null; // Limit to 2 players
   
    
    //players[socket.id] = { playerNumber };

    // Inform the player of their number
    socket.emit('playerNumber', playerNumber);
    socket.on('ready', (data) => {
        
        data.playerNumber = players[socket.id].playerNumber;
        
        if (playercount > 1) {
            io.emit('ready', data); // Emit to all clients
            console.log("player ready");
         
        } else {
            console.log("only 1 connected")
        }
    });
    
    socket.on('gamestate', (data) => {
        
        data.playerNumber = players[socket.id].playerNumber;
        
        if (playercount > 0) {
            io.emit('state', data); // Emit to all clients
            console.log("hp change");
         
        }
    });


    
    socket.on('move', (data) => {
        
        data.playerNumber = players[socket.id].playerNumber;
        
        if ((Object.keys(players).length) > 1) {
            io.emit('move', data); // Emit to all clients
            //console.log("playermove");
        } else {
            data = "wait until the other player connects";
            io.emit("wait", data);
        }
        
    });
    socket.on('release', (data) => {
        
        data.playerNumber = players[socket.id].playerNumber;
        
        if ((Object.keys(players).length) > 1) {
            io.emit('release', data); // Emit to all clients
            console.log("releasedkey");
        } else {
            data = "wait until the other player connects";
            io.emit("wait", data);
        }
    });
    
    
    socket.on('disconnect', () => {
        console.log("player dc : ${socket.id}");
        delete players[socket.id];
        playercount--;
        let i = 1;
        for (let id in players) {
          players[id].playerNumber = i++;
        }
        socket.emit('playerNumber', playerNumber);
        console.log("players left: " + playercount);
        
    });
});

function getAvailablePlayerNumber() {
    let playerNumbers = new Set(Object.values(players).map(p => p.playerNumber));
    let playerNumber = 1;
    while (playerNumbers.has(playerNumber)) {
      playerNumber++;
    }
    return playerNumber;
  }
  
  function updatePlayerNumbers() {
    let playerNumber = 1;
    for (let id in players) {
      players[id].playerNumber = playerNumber++;
      io.to(id).emit('playerNumber', players[id].playerNumber);
    }
  }


server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
