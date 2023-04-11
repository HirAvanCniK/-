const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "blur",
  category: "👻 Fun Commands",
  usage: `blur [user]`,
  description: "Image cmd in the style blur",
  data:{
    name: "blur",
    description: "Image cmd in the style blur",
    options:[
      {
        name: "user",
        description: "The user to blur",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)

    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.blur(avatar);
    let attachment = await new Discord.MessageAttachment(image, "blur.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://blur.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}