const Discord = require('discord.js');

module.exports = {
    name: 'pokemon',
    description: "send a random image of pokemon",
    aliases: ["pokemon"],
    category: "👻 Fun Commands",
    usage: "pokemon",
    run: async (client, message) => {

        number = 83;
        imageNumberP = Math.floor(Math.random() * (number - 1 + 1)) + 1;
        message.channel.send({ files: ["./pokemon discord/image" + imageNumberP + ".png"] }).then(async function (){
            var embed = new Discord.MessageEmbed()
                .setTitle(`***Ti piace questo pokèmon?***`)
                .setDescription(`:thumbsup: SI     :thumbsdown: NO `)
                .setColor(0x6200FF)
            let msgEmbed = await message.channel.send(embed);
            await msgEmbed.react('👍')
            await msgEmbed.react('👎')
        })
    }
}
