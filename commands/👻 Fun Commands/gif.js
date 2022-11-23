const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const rgif = require("discord-gifs");
module.exports = {
  name: "gif",
  category: "👻 Fun Commands",
  cooldown: 1,
  usage: `gif [user]`,
  description: "Random gif",
  run: async (client, message, args) => {
    return message.reply(
      new MessageEmbed()
        .setColor(config.colors.yes)
        .setFooter(client.user.username, config.AVATARURL)
        .setImage(rgif.randomgifs())
    );
  },
};
