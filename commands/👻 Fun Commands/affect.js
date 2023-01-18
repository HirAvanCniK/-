const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const canvacord = require("canvacord");
const config = require("../../config.json");

module.exports = {
  name: "affect",
  category: "👻 Fun Commands",
  description: "Image cmd in the style affect",
  usage: "affect [user]",
  data:{
    name: "affect",
    description: "Image cmd in the style affect",
    options:[
      {
        name: "user",
        description: "The user to affect",
        type: "USER",
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.affect(avatar);
    let attachment = await new Discord.MessageAttachment(image, "affect.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://affect.png")
      
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}