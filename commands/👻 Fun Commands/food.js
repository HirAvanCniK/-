const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();
const config = require("../../config.json")
module.exports = {
  name: "food",
  category: "👻 Fun Commands",
  usage: "food",
  run: async (client, message, args) => {
  var superagent = require('superagent');

    if (!message.channel.nsfw) return message.channel.send('You must use this command in an nsfw lounge!') 

    var lo = new Discord.MessageEmbed()
                .setDescription(`Please wait... <a:Loading:592829210054098944>`)
                .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)

    message.channel.send(lo).then(m => {

        superagent.get('https://nekobot.xyz/api/image').query({ type: 'food'}).end((err, response) => {

            var embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`:underage:\n**[image not loading? click here](${response.body.message})**`)
                .setTimestamp().setColor(config.colors.yes).setFooter(client.user.username, config.AVATARURL)
                .setImage(response.body.message)
            
            m.edit(embed_nsfw);
        });
    });
  
}
};