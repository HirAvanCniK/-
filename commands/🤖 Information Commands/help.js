module.exports = {
    name: "help",
    aliases: ["h"],
    description: "list of all commands",
    usage: "help",
    run : async(client, message, args) => {
        console.log("Comando help riuscito.");
    }
}