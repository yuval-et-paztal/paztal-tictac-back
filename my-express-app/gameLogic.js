// 1. We "export" this so the rest of the project can use it.
exports.calculateWinner = (squares) => {

    // 2. These are the "Winning Patterns."
    // Each small group of three numbers represents a row, column, or diagonal.
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical columns
        [0, 4, 8], [2, 4, 6],             // Diagonals
    ];

    // 3. The "For-Loop" (The Scanning Process)
    // This tells the computer: "Look at every winning pattern in that list above, one by one."
    for (let line of lines) {
        
        // 4. Checking a specific line
        // If we are looking at [0, 1, 2], 'a' becomes 0, 'b' becomes 1, and 'c' becomes 2.
        const [a, b, c] = line;

        // 5. The "Winner Check"
        // This says: 
        // - Is there something in square 'a'? (Is it NOT empty?)
        // - AND is square 'a' the same as square 'b'?
        // - AND is square 'a' the same as square 'c'?
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]; // If all three match, return the winner ('X' or 'O')
        }
    }

    // 6. The "Draw Check"
    // If we finished the loop and no one won, we check if there are any empty (null) squares left.
    // If no squares are empty, it's a 'Draw'. Otherwise, return null (game still going).
    return squares.includes(null) ? null : 'Draw';
};