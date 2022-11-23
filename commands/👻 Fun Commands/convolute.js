const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "convolute",
  category: "👻 Fun Commands",
  usage: `convolute [user]`,
  description: "Image cmd in the style convolute",
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
    let image = await canvacord.Canvas.convolute(avatar, [69, 12], false);
    let attachment = await new Discord.MessageAttachment(
      image,
      "convolute.png"
    );
    let fastembed2 = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .setFooter(client.user.username, config.AVATARURL)
      .setImage("attachment://convolute.png")
      .attachFiles(attachment)
      .setFooter(client.user.username, config.AVATARURL);
    await message.channel.send(fastembed2);
    await tempmsg.delete(); //clyde
  },
};
