const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "trash",
  category: "👻 Fun Commands",
  usage: `trash [user]`,
  description: "Image cmd in the style trash",
  data:{
    name: "trash",
    description: "Image cmd in the style trash",
    options:[
      {
        name: "user",
        description: "The user to trash",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.trash(avatar);
    let attachment = await new Discord.MessageAttachment(image, "trash.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://trash.png")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}