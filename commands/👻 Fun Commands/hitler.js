const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "hitler",
  category: "👻 Fun Commands",
  usage: `hitler [user]`,
  description: "Image cmd in the style hitler",
  data:{
    name: "hitler",
    description: "Image cmd in the style hitler",
    options:[
      {
        name: "user",
        description: "The user to hitler",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.hitler(avatar);
    let attachment = await new Discord.MessageAttachment(image, "hitler.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://hitler.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}
