const Discord = require('discord.js');

module.exports = {
    name: `clear`,
    description: "delete number messages",
    aliases: ["clear"],
    category: "⛔️ Moderation Commands",
    usage: "clear <number>",
    run: async (Client, message, args, prefix) => {

        if(message.author.id == "786942470545080340"){

            if (!args[0]) {
                return message.reply(`Inserisci un numero!!!`).then(msg => {
                    msg.delete({ timeout: 10000 })
                })
            }
    
            if(args[0] >= 100){
                args[0] = 99;
                message.reply('Il massimo di messaggi che posso eliminare sono 99!').then(msg => {
                    msg.delete({ timeout: 10000 })
                })
            }
    
            let deleteAmount;
            
            if (isNaN(args[0])) return message.channel.send('Inserisci quanti messaggi devo eliminare!').then(msg => {
                msg.delete({ timeout: 10000 })
            })
    
            deleteAmount = parseInt(args[0]);
    
            message.channel.bulkDelete(deleteAmount + 1, true);
    
            var embed7 = new Discord.MessageEmbed()
                .setTitle(`Ha eliminato ***${deleteAmount}*** Messaggi.`)
                .setAuthor(message.author.username)
                .setColor(0x6200FF)
                .setTimestamp()
            message.reply(embed7).then(msg => {
                msg.delete({ timeout: 10000 })
            })
            return;
        }

        if (!message.member.permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(
                `Non disponi delle autorizzazioni per utilizzare questo comando. ${message.author.username}`
            )
        
        if (!args[0]){
            return message.reply(`Inserisci un numero!!!`).then(msg => {
                msg.delete({ timeout: 10000 })
            })
        }

        if(args[0] >= 100){
            args[0] = 99;
            message.reply('Il massimo di messaggi che posso eliminare sono 99!').then(msg => {
                msg.delete({ timeout: 10000 })
            })
        }

        let deleteAmount;
        
        if (isNaN(args[0])) return message.channel.send('Inserisci quanti messaggi devo eliminare!').then(msg => {
            msg.delete({ timeout: 10000 })
        })

        deleteAmount = parseInt(args[0]);

        message.channel.bulkDelete(deleteAmount + 1, true);

        var embed7 = new Discord.MessageEmbed()
            .setTitle(`Ha eliminato ***${deleteAmount}*** Messaggi.`)
            .setAuthor(message.author.username)
            .setColor(0x6200FF)
            .setTimestamp()
        message.reply(embed7).then(msg => {
            msg.delete({ timeout: 10000 })
        })
    }
}