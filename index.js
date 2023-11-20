const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8008",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use('/static', express.static('public'));

let games = {}; // Stores player data for each game

app.get('/static/:game_id', (req, res) => {
    const game_id = req.params.game_id;
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    const game_id = socket.handshake.query.game_id;
    if (!games[game_id]) {
        games[game_id] = {};
    }
    socket.join(game_id);

    console.log("ws connection started: " + socket.id);
    const availableNumber = getAvailablePlayerNumber(game_id);
    games[game_id][socket.id] = { playerNumber: availableNumber };

    console.log(`Player connected: ${socket.id} as Player ${availableNumber}`);
    socket.emit('playerNumber', availableNumber);

    socket.on('ready', (data) => {
        data.playerNumber = games[game_id][socket.id].playerNumber;
        io.to(game_id).emit('ready', data); // Emit only to clients in the same game room
        console.log("player ready up in game " + game_id);
    });

    socket.on('gamestate', (data) => {
        data.playerNumber = games[game_id][socket.id].playerNumber;
        io.to(game_id).emit('state', data); // Emit only to clients in the same game room
        console.log("game state changed in game " + game_id);
    });

    socket.on('move', (data) => {
        data.playerNumber = games[game_id][socket.id].playerNumber;
        io.to(game_id).emit('move', data); // Emit only to clients in the same game room
    });

    socket.on('release', (data) => {
        data.playerNumber = games[game_id][socket.id].playerNumber;
        io.to(game_id).emit('release', data); // Emit only to clients in the same game room
    });

    socket.on('disconnect', () => {
        console.log(`Player disconnected: ${socket.id} from game ${game_id}`);
        delete games[game_id][socket.id];
        updatePlayerNumbers(game_id);
    });
});

function getAvailablePlayerNumber(game_id) {
    let playerNumbers = new Set(Object.values(games[game_id]).map(p => p.playerNumber));
    let playerNumber = 1;
    while (playerNumbers.has(playerNumber)) {
      playerNumber++;
    }
    return playerNumber;
}

function updatePlayerNumbers(game_id) {
    let playerNumber = 1;
    for (let id in games[game_id]) {
        games[game_id][id].playerNumber = playerNumber++;
        io.to(id).emit('playerNumber', games[game_id][id].playerNumber);
    }
}

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});
