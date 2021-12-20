const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'slowmode',
    description: "active slowmode in a text channel",
    aliases: ["slowmode"],
    category: "⛔️ Moderation Commands",
    usage: "slowmode <number>",
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('Tu non hai il permesso **MANAGE_CHANNELS**!').then(m => m.delete({ timeout: 5000 }));

        if (!args[0]) return message.channel.send('Non hai specificato un tempo!').then(m => m.delete({ timeout: 5000 }));

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'nessuna ragione';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {
            const time = 0;
            if (currentCooldown === 0) return message.channel.send('Il tempo di recupero del canale è già disattivato.').then(m => m.delete({ timeout: 5000 }));

            embed.setTitle('Slowmode Disabilitato')
                .setColor(0x6200FF)

            return message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('non è un orario tempo, riprova!').then(m => m.delete({ timeout: 5000 }));

        if (time >= 21600) return message.channel.send('Il limite dello slowmode è troppo alto, inserisci un valore inferiore a 6 ore.').then(m => m.delete({ timeout: 5000 }));

        if (currentCooldown === time) return message.channel.send(`Lo slowmode è già impostato su ${args[0]}`);

        embed.setTitle('Slowmode abilitato')
            .addField('Slowmode: ', args[0])
            .addField('Reason: ', reason)
            .setColor(0x6200FF);

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}