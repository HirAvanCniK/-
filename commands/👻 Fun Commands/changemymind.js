const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "changemymind",
  category: "👻 Fun Commands",
  usage: `changemymind [text]`,
  description: "Image cmd in the style changemymind",
  data:{
    name: "changemymind",
    description: "Image cmd in the style changemymind",
    options:[
      {
        name: "text",
        description: "The text to changemymind",
        type: ApplicationCommandOptionType.User,
        required: false
      }
    ]
  },
  async execute(interaction){
    const msg = interaction.options.getString("text");
    if (!msg) msg = "Please provide text!";
    let image = await canvacord.Canvas.changemymind(msg);
    let attachment = await new Discord.MessageAttachment(
      image,
      "changemymind.png"
    );
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://changemymind.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}