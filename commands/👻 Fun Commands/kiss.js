const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Discord = require(`discord.js`);
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "kiss",
  category: "👻 Fun Commands",
  usage: `kiss [user]`,
  description: "Image cmd in the style kiss",
  data:{
    name: "kiss",
    description: "Image cmd in the style kiss",
    options:[
      {
        name: "user_1",
        description: "The first user to kiss",
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: "user_2",
        description: "The second user to kiss",
        type: ApplicationCommandOptionType.User,
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente_1 = interaction.options.getUser("user_1");
    const utente_2 = interaction.options.getUser("user_2");
    var user = interaction.guild.members.cache.get(utente_1.id)
    var user2 = interaction.guild.members.cache.get(utente_2.id)
    if (user === user2) user2 = message.author;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let avatar2 = user2.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.kiss(avatar, avatar2);
    let attachment = await new Discord.MessageAttachment(image, "kiss.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://kiss.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}