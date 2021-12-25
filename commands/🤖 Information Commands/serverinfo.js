const Discord = require('discord.js');

module.exports = {
    name: 'serverinfo',
    description: "information of a server",
    aliases: ["serverinfo"],
    category: "🤖 Information Commands",
    usage: "serverinfo",

    run: (client, message) => {
        var server = message.member.guild;

        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;
        var verifiedBotCount = server.members.cache.filter(member => member.user.bot.verify).size;

        var categoryCount = server.channels.cache.filter(c => c.type == "category").size
        var textCount = server.channels.cache.filter(c => c.type == "text").size
        var voiceCount = server.channels.cache.filter(c => c.type == "voice").size
        var region;
        var birthday;
        var embed2 = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("Tutte le info su questo server")
            .setThumbnail(server.iconURL())
            .addField(":crown: Amministratore", "`" + server.owner.user.username + "`", true)
            .addField("Server :id:", "`" + server.id + "`", true)
            .addField(":map: Regione", "`" + region + "`", true)
            .addField(":family: Membri", "`Totali: " + server.memberCount + " | Utenti: " + utentiCount + " - Bots: " + botCount + " - Bot verificati: " + verifiedBotCount + "`", false)
            .addField(":ticket: Canali", "`Categorie: " + categoryCount + " | Testo: " + textCount + " - Vocali: " + voiceCount + "`", false)
            .addField(":birthday: Server created", "`" + server.createdAt.toDateString() + "`", true)
            .addField(":100: Livello del boost", "`Livello " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")`", true)
            .setColor(0x6200FF)

        message.channel.send(embed2)
    }
}