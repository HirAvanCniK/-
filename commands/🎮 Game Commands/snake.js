const SnakeGame = require('snakecord');
const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
    name: "snake",
    category: "🎮 Game Commands",
    description: "play a famous game snake",
    usage: "snake",
    run : async(client, message, args)=>{
        const snakeGame = new SnakeGame({
            title: 'Snake Game',
            color: "GREEN",
            timestamp: false,
            gameOverTitle: "Game Over"
         });
        
         client.on('message', message => {
            if(!message.content.startsWith(config.prefix) || message.author.bot) return;
                const args = message.content.slice(config.prefix.length).trim().split(/ +/);
                const command = args.shift().toLowerCase();
            if(command === 'snake' || command === 'snakegame') {
                return snakeGame.newGame(message);
            }
        });
    }
}