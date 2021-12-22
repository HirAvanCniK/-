module.exports = {
    name: 'tris',
    category: "🎮 Game Commands",
    description: "play a famous game tictactoe",
    usage: "tris [user]",
    aliases: ["titactoe"],
    run : async(client, message, args) => {
        console.log("Comando tris avvenuto con successo.");
    }
}