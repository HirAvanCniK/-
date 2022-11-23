const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "wasted",
  category: "👻 Fun Commands",
  usage: `wasted [user]`,
  description: "Image cmd in the style wasted",
  run: async (client, message, args) => {
    let tempmsg = await message.channel.send(
      new MessageEmbed()
        .setColor(config.colors.yes)
        .setFooter(client.user.username, config.AVATARURL)
        .setAuthor(
          "Loading...",
          "https://cdn.discordapp.com/emojis/769935094285860894.gif"
        )
    );
    let user = message.mentions.users.first() || message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.wasted(avatar);
    let attachment = await new Discord.MessageAttachment(image, "wasted.png");
    let fastembed2 = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .setFooter(client.user.username, config.AVATARURL)
      .setFooter(client.user.username, config.AVATARURL)
      .setImage("attachment://wasted.png")
      .attachFiles(attachment);
    await message.channel.send(fastembed2);
    await tempmsg.delete(); //jokeOverHead
  },
};
