const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "burn",
  category: "👻 Fun Commands",
  usage: `burn [user]`,
  description: "Image cmd in the style burn",
  data:{
    name: "burn",
    description: "Image cmd in the style affect",
    options:[
      {
        name: "user",
        description: "The user to affect",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.burn(avatar, 5);
    let attachment = await new Discord.MessageAttachment(image, "burn.gif");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://burn.gif")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}