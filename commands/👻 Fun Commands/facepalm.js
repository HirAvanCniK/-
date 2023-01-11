const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "facepalm",
  category: "👻 Fun Commands",
  usage: `facepalm [user]`,
  description: "Image cmd in the style facepalm",
  data:{
    name: "facepalm",
    description: "Image cmd in the style facepalm",
    options:[
      {
        name: "user",
        description: "The user to facepalm",
        type: "USER",
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.facepalm(avatar);
    let attachment = await new Discord.MessageAttachment(image, "facepalm.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://facepalm.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}