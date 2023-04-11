const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "rip",
  category: "👻 Fun Commands",
  usage: `rip [user]`,
  description: "Image cmd in the style rip",
  data:{
    name: "rip",
    description: "Image cmd in the style rip",
    options:[
      {
        name: "user",
        description: "The user to rip",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.rip(avatar);
    let attachment = await new Discord.MessageAttachment(image, "rip.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://rip.png")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}