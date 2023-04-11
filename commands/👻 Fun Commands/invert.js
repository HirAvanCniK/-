const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "invert",
  category: "👻 Fun Commands",
  usage: `invert [user]`,
  description: "Image cmd in the style invert",
  data:{
    name: "invert",
    description: "Image cmd in the style invert",
    options:[
      {
        name: "user",
        description: "The user to invert",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.invert(avatar);
    let attachment = await new Discord.MessageAttachment(image, "invert.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://invert.png")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}
