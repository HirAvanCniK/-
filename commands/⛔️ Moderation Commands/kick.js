const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: "kick an user",
    aliases: ["kick"],
    category: "⛔️ Moderation Commands",
    usage: "kick <user>",
    run: (client, message) => {
        var utenteKick = message.mentions.members.first();

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteKick) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send('Io non ho il permesso');
            return;
        }

        utenteKick.kick()
            .then(() => message.channel.send("<@" + utenteKick + ">" + " è stato kiccato"))
    }
}