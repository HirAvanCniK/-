const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const canvacord = require("canvacord");
const config = require("../../config.json");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "beautiful",
  category: "👻 Fun Commands",
  description: "Image cmd in the style beautiful",
  usage: "beautiful [user]",
  data:{
    name: "beautiful",
    description: "Image cmd in the style beautiful",
    options:[
      {
        name: "user",
        description: "The user to beautiful",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.beautiful(avatar);
    let attachment = await new Discord.MessageAttachment(
      image,
      "beautiful.png"
    );
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://beautiful.png")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}