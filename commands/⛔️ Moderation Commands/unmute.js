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

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(`${Member.displayName} è ora smutato.`)
    }
}