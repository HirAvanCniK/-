const Discord = require("discord.js");
const { DiscordBattleShip } = require("discord-battleship");
const config = require("../../config.json")
const BattleShip = new DiscordBattleShip({
    embedColor: "BLUE",
    prefix: `${config.prefix}`,
});
module.exports = {
    name: "battleship",
    category: "🎮 Game Commands",
    description: "play a famous game battle ship",
    usage: "battleship <user>",
    run: async(client, message) => {
        await BattleShip.createGame(message);
    }
}