module.exports = {
    name: 'tris',
    category: "🎮 Game Commands",
    aliases: ["tictactoe"],
    description: "play a famous game tictactoe",
    usage: "tris [user]",
    run : async(client, message, args) => {
        const TicTacToe = require('discord-tictactoe');
        const game = new TicTacToe({ language: 'it' })
        game.handleMessage(message);
    }
}