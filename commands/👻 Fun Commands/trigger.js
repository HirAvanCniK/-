const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Discord = require(`discord.js`);
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "trigger",
  category: "👻 Fun Commands",
  usage: `trigger [user]`,
  description: "Image cmd in the style trigger",
  data:{
    name: "trigger",
    description: "Image cmd in the style trigger",
    options:[
      {
        name: "user",
        description: "The user to trigger",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.trigger(avatar);
    let attachment = await new Discord.MessageAttachment(
      image,
      "triggered.gif"
    );
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://triggered.gif")
    interaction.reply({embeds: [embed], files: [attachment]})
  }
}