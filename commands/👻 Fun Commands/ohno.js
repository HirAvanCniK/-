const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "ohno",
  category: "👻 Fun Commands",
  usage: `ohno [user]`,
  description: "Image cmd in the style ohno",
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
    let msg = args.join(" ");
    if (!msg) msg = "Please provide text!";
    let image = await canvacord.Canvas.ohno(msg);
    let attachment = await new Discord.MessageAttachment(image, "ohno.png");
    let fastembed2 = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .setFooter(client.user.username, config.AVATARURL)
      .setImage("attachment://ohno.png")
      .attachFiles(attachment)
      .setFooter(client.user.username, config.AVATARURL);
    await message.channel.send(fastembed2);
    await tempmsg.delete(); //ohno
  },
};
