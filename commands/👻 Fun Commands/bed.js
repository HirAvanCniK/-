const { MessageEmbed } = require("discord.js");

const Discord = require(`discord.js`);
const canvacord = require("canvacord");

const config = require("../../config.json");
const path = require("path");
module.exports = {
  name: "bed",
  category: "👻 Fun Commands",
  usage: `bed [user]`,
  description: "Image cmd in the style bed",
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
    let user2 = message.mentions.users.last() || message.author;
    if (user === user2) user2 = message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let avatar2 = user2.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.bed(avatar, avatar2);
    let attachment = await new Discord.MessageAttachment(image, "bed.png");
    let fastembed2 = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .setFooter(client.user.username, config.AVATARURL)
      .setImage("attachment://bed.png")
      .attachFiles(attachment)
      .setFooter(client.user.username, config.AVATARURL);
    await message.channel.send(fastembed2);
    await tempmsg.delete(); //bed
  },
};
