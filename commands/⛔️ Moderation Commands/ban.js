module.exports = {
    name: 'ban',
    description: "ban an user",
    aliases: ["ban"],
    category: "⛔️ Moderation Commands",
    usage: "ban <user>",
    run: (client, message) => {
        var utenteban = message.mentions.members.first();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send('Non hai il permesso');
            return;
        }

        if (!utenteban) {
            message.channel.send('Non hai menzionato nessun utente');
            return;
        }

        if (!message.mentions.members.first().kickable) {
            message.channel.send('Io non ho il permesso');
            return;
        }

        utenteban.ban()
            .then(() => message.channel.send("<@" + utenteban + ">" + " è stato bannato"))
    }
}