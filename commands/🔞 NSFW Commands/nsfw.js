const Discord = require('discord.js');
const config = require("../../config.json");
const fetch = require('node-fetch');

module.exports = {
    name: "nsfw",
    category: "🔞 NSFW Commands",
    usage: "nsfw <category>",
    description: "Show an nsfw",
    run: async (client, message, args) => {
        var errMessage = "This is not an NSFW Channel";
        if (!message.channel.nsfw) {
            message.react('💢');
            return message.reply(errMessage)
                .then(msg => {
                    msg.delete({ timeout: 3000 })
                })
        }

        const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"

        if (!message.channel.nsfw) return message.reply('You must use this command in an nsfw lounge!')
        if (!args[0]) return message.reply("You must enter the category")
        for (let i = 0; i < args[0].length; i++) {
            if (!alphabet.includes(args[0][i])) return message.reply(`Character '**${args[0][i]}**' is not allowed`)
        }
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const tempmsg = new Discord.MessageEmbed()
            .setColor(config.colors.yes)
            .setFooter(client.user.username, config.AVATARURL)
            .setAuthor("Loading...", "https://cdn.discordapp.com/emojis/769935094285860894.gif")

        message.channel.send(tempmsg).then(async m => {
            links = []
            const response = await fetch(`https://www.pornpics.com/${args[0]}`);
            const body = await response.text();
            array = body.split("\n")
            for (let line in array) {
                if (array[line].includes("https://cdni.pornpics.com")) {
                    link = "https://cdni.pornpics.com" + array[line].split("https://cdni.pornpics.com")[1].split('"')[0]
                    links.push(link)
                }
            }

            do {
                image = links[getRndInteger(0, links.length - 1)]
            } while (image == "https://cdni.pornpics.com")

            if (!image) {
                const embed_nsfw = new Discord.MessageEmbed()
                    .setDescription(args[0] + `\nNo results found for the category '**${args[0]}**'`)
                return m.edit(embed_nsfw)
            } else {
                const embed_nsfw = new Discord.MessageEmbed()
                    .setDescription(args[0])
                    .setImage(image)
                return m.edit(embed_nsfw)
            }
        })
    }
}