const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "ohno",
  category: "👻 Fun Commands",
  usage: `ohno [text]`,
  description: "Image cmd in the style ohno",
  data:{
    name: "ohno",
    description: "Image cmd in the style ohno",
    options:[
      {
        name: "text",
        description: "The text to ohno",
        type: ApplicationCommandOptionType.String,
        required: false
      }
    ]
  },
  async execute(interaction){
    const msg = interaction.options.getString("text");
    if (!msg) msg = "Please provide text!";
    let image = await canvacord.Canvas.ohno(msg);
    let attachment = await new Discord.MessageAttachment(image, "ohno.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://ohno.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}