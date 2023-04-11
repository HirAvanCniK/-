const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "wasted",
  category: "👻 Fun Commands",
  usage: `wasted [user]`,
  description: "Image cmd in the style wasted",
  data:{
    name: "wasted",
    description: "Image cmd in the style wasted",
    options:[
      {
        name: "user",
        description: "The user to wasted",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.wasted(avatar);
    let attachment = await new Discord.MessageAttachment(image, "wasted.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://wasted.png")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}