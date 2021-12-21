const { Message, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'tempmute',
    description: "mute temporarily an user",
    aliases: ["tempmute"],
    category: "⛔️ Moderation Commands",
    usage: "tempmute <user> <sec>",
    /**
     * @param {Message} message
     */
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Non disponi delle autorizzazioni per utilizzare questo comando.')
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if (!Member) return message.channel.send('Membro non trovato.')
        if (Member.id == "536798044939878403") return message.reply("L'utente selezionato è il mio creatore non potrei mai mutarlo.");
        if (Member.id == "867526392156258324") return message.reply("Ops non posso mutarmi da solo.")
        if (!time) return message.channel.send('Specifica il tempo in secondi.')
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

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send(`${Member.displayName} è ora smutato.`)
        }, ms(time))
    }
}