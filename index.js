const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Import UUID for generating unique game IDs
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const cors = require('cors');

// Setting up Socket.IO with CORS
const io = require('socket.io')(server, {
    cors: {
        origin: "http://192.168.1.27/*", // Make sure this matches your client origin
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

let games = {};

app.get('/newgame', (req, res) => {
    let availableGameId = null;
    console.log("new game requested");
    // Check for a game with less than two players
    for (let id in games) {
        if (Object.keys(games[id]).length < 2) {
            availableGameId = id;
            break;
        }
    }
    // If no available game, create a new one
    if (!availableGameId) {
        console.log("new game created");
        availableGameId = uuidv4();
        games[availableGameId] = {};
    }
    let gameUrl = `http://192.168.1.27/${availableGameId}`;
    console.log("game sent: " + gameUrl);
    res.json({ url: gameUrl }); // Correctly send back the new or existing game ID
});

app.get('/:game_id', (req, res) => {
    console.log("games: " , games);
    const game_id = req.params.game_id;
    if (games[game_id]) {
          console.log("game id exists");// Check if the game ID exists
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } else {
        res.status(404).send('Game not found'); // Handle non-existing game IDs
    }
});

io.on('connection', (socket) => {
    console.log("socket connected");
    let game_id = socket.handshake.query.game_id;
    console.log("game id: " + game_id);
    
    /*for (let game in games) {
      console.log("game: " + game);
    }*/
    
    if (game_id && games[game_id]) {
        socket.join(game_id);

        const availableNumber = getAvailablePlayerNumber(game_id);
        games[game_id][socket.id] = { playerNumber: availableNumber };
        

        console.log(`Player connected: ${socket.id} as Player ${availableNumber}`);
        socket.emit('playerNumber', availableNumber);

        // Event listeners for game logic
        socket.on('ready', (data) => {
            data.playerNumber = games[game_id][socket.id].playerNumber;
            io.to(game_id).emit('ready', data);
        });

        socket.on('gamestate', (data) => {
            data.playerNumber = games[game_id][socket.id].playerNumber;
            io.to(game_id).emit('state', data);
        });

        socket.on('move', (data) => {
            data.playerNumber = games[game_id][socket.id].playerNumber;
            io.to(game_id).emit('move', data);
        });

        socket.on('release', (data) => {
            data.playerNumber = games[game_id][socket.id].playerNumber;
            io.to(game_id).emit('release', data);
        });

        socket.on('disconnect', () => {
            console.log(`Player disconnected: ${socket.id} from game ${game_id}`);
            delete games[game_id][socket.id];
            if (Object.keys(games[game_id]).length === 0) {
                console.log("game: " + game_id + " closed");
                delete games[game_id]; // Remove the game if no players are connected
            } else {
                updatePlayerNumbers(game_id);
            }
        });

    } else {
        console.log(`Connection attempt to non-existing game: ${game_id}`);
        socket.disconnect();
    }
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

server.listen(80, () => {
    console.log('Server is running on port 80');
});
