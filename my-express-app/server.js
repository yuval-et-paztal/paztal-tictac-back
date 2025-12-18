const express = require('express'); // Import express
const cors = require('cors');       // Import cors
const { calculateWinner } = require('./gameLogic'); // Import your 2A logic

const app = express(); // Initialize the server

app.use(cors());          // Use the security helper
app.use(express.json());  // Tell the server to understand JSON data

// 1. DATA STORAGE
// Since we aren't using a database yet, we keep the game in a variable.
let gameState = {
    board: Array(9).fill(null),
    isXNext: true,
    winner: null
};

// 2. THE "GET" ROUTE (Read data)
// This is like a "Status Report." The frontend calls this to see the board.
app.get('/game', (req, res) => {
    res.json(gameState);
});

// 3. THE "POST" ROUTE (Update data)
// When a player clicks a square, the frontend sends a "POST" message.
app.post('/move', (req, res) => {
    const index = Number(req.body.index); // Which square (0-8) was clicked?

    // Logic Check: If the game is won or the square is full, ignore the click.
    if (gameState.winner || gameState.board[index]) {
        return res.status(400).json({ message: "Invalid Move" });
    }

    // Update the board
    gameState.board[index] = gameState.isXNext ? 'X' : 'O';
    
    // Switch the turn
    gameState.isXNext = !gameState.isXNext;

    // Check if that move finished the game
    gameState.winner = calculateWinner(gameState.board);

    // Send the updated game state back to the user
    res.json(gameState);
});

// 4. START THE SERVER
app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});