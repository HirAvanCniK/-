const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "convolute",
  category: "👻 Fun Commands",
  usage: `convolute [user]`,
  description: "Image cmd in the style convolute",
  data:{
    name: "convolute",
    description: "Image cmd in the style convolute",
    options:[
      {
        name: "user",
        description: "The user to convolute",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.convolute(avatar, [69, 12], false);
    let attachment = await new Discord.MessageAttachment(
      image,
      "convolute.png"
    );
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://convolute.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}