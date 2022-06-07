module.exports = {
    name: "help",
    aliases: ["h"],
    category: "🤖 Information Commands",
    description: "list of all commands",
    usage: "help",
    run : async(client, message, args) => {
        console.log("Comando help riuscito.");
    }
}