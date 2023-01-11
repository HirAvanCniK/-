const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "delete",
  category: "👻 Fun Commands",
  usage: `delete [user]`,
  description: "Image cmd in the style delete",
  data:{
    name: "delete",
    description: "Image cmd in the style delete",
    options:[
      {
        name: "user",
        description: "The user to delete",
        type: "USER",
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.delete(avatar, true);
    let attachment = await new Discord.MessageAttachment(image, "delete.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://delete.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}