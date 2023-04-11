const Canvas = require("canvas");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "stonks",
  category: "👻 Fun Commands",
  usage: `stonks [user]`,
  description: "Image cmd in the style stonks",
  data:{
    name: "stonks",
    description: "Image cmd in the style stonks",
    options:[
      {
        name: "user",
        description: "The user to stonks",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    const canvas = Canvas.createCanvas(700, 394);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("images/stonks.png");
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(160, 95, 70, 0, Math.PI * 2, true); //position of img
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(
      user.displayAvatarURL({ format: "png" })
    );
    ctx.drawImage(avatar, 85, 20, 150, 150);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "stonks.png"
    );
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setTimestamp()
      .setImage("attachment://stonks.png")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}