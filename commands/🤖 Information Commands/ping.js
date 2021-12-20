const Discord = require('discord.js');

module.exports = {
    name: "ping",
    description: "your latency",
    aliases: ["ping"],
    category: "🤖 Information Commands",
    usage: "ping",
    run: (client, message) => {
        message.reply(`:satellite: Pinging... :satellite:`).then((msg) => {
            const pingembed = new Discord.MessageEmbed()
            	.setTitle(`:satellite_orbital: Ping!`)
            	.setDescription(
                	`:satellite_orbital: \nYour ping is **${Math.floor(
                    	msg.createdTimestamp - message.createdTimestamp
                    )}ms**\nBOT ping is **${Math.round(client.ws.ping)}ms**\n:satellite_orbital:`
                )
            	.setColor("RANDOM")
            	msg.edit(pingembed);
        })
    }
}