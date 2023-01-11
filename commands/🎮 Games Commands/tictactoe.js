module.exports = {
    name: "tictactoe",
    description: "Play a Tic Tac Toe game",
    category: "🎮 Games Commands",
    usage: "tictactoe",
    data: {
        name: "tictactoe",
        description: "Play a Tic Tac Toe game",
        options: [
            {
                name: "opponent",
                description: "Opponent of you",
                type: "USER",
                required: true
            }
        ]
    },
    execute(interaction){
    }
}