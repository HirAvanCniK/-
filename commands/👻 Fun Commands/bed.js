const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const canvacord = require("canvacord");
const config = require("../../config.json");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "bed",
  category: "👻 Fun Commands",
  usage: `bed [user] [user]`,
  description: "Image cmd in the style bed",
  data:{
    name: "bed",
    description: "Image cmd in the style bed",
    options:[
      {
        name: "user_1",
        description: "The first user to bed",
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: "user_2",
        description: "The second user to bed",
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
    let image = await canvacord.Canvas.bed(avatar, avatar2);
    let attachment = await new Discord.MessageAttachment(image, "bed.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://bed.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}