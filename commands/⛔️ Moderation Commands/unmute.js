const { Message } = require('discord.js')

module.exports = {
    name: 'unmute',
    description: 'unmute',
    aliases: ["toggle mute of a member"],
    category: "⛔️ Moderation Commands",
    usage: "unmute <user>",
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!Member) return message.channel.send('Membro non trovato.')
        if (Member.id == "536798044939878403") return message.reply("L'utente selezionato è il mio creatore non potrà mai essere mutato.");
        if (Member.id == "867526392156258324") return message.reply("Ops non posso mutarmi da solo.")
        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)
        if (!Member.roles.cache.has(`${role.id}`)) return message.channel.send(`${Member.displayName} non è mutato.`)
        message.channel.send(`${Member.displayName} è ora smutato.`)
    }
}