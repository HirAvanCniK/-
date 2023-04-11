const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');


module.exports = {
  name: "shit",
  category: "👻 Fun Commands",
  usage: `shit [user]`,
  description: "Image cmd in the style shit",
  data:{
    name: "shit",
    description: "Image cmd in the style shit",
    options:[
      {
        name: "user",
        description: "The user to shit",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.shit(avatar);
    let attachment = await new Discord.MessageAttachment(image, "shit.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://shit.png")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}
