const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "jail",
  category: "👻 Fun Commands",
  usage: `jail [user]`,
  description: "Image cmd in the style jail",
  data:{
    name: "jail",
    description: "Image cmd in the style jail",
    options:[
      {
        name: "user",
        description: "The user to jail",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.jail(avatar, false);
    let attachment = await new Discord.MessageAttachment(image, "jail.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://jail.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}