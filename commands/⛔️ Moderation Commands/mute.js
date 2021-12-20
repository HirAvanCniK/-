const { Message, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'mute',
    description: "mute an user",
    aliases: ["mute"],
    category: "⛔️ Moderation Commands",
    usage: "mute <user>",
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Non disponi delle autorizzazioni per utilizzare questo comando.')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!Member) return message.channel.send('Il membro non è stato trovato.')
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
        if (!role) {
            try {
                message.channel.send('Il ruolo muted non è stato trovato, tentativo di creare un ruolo muted.')

                let muterole = await message.guild.roles.create({
                    data: {
                        name: 'muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
                message.channel.send('Il ruolo muted è stato creato con successo.')
            } catch (error) {
                console.log(error)
            }
        };
        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
        if (Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} è già stato mutato.`)
        await Member.roles.add(role2)
        message.channel.send(`${Member.displayName} è ora mutato.`)
    }
}