const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Discord = require(`discord.js`);
const canvacord = require("canvacord");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "distracted",
  category: "👻 Fun Commands",
  usage: `distracted [user]`,
  description: "Image cmd in the style distracted",
  data:{
    name: "distracted",
    description: "Image cmd in the style distracted",
    options:[
      {
        name: "user_1",
        description: "The first user to distracted",
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: "user_2",
        description: "The second user to distracted",
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
    let avatar3 = interaction.guild.iconURL({ dynamic: false, format: "png" });
    if (user !== interaction.user && user2 !== interaction.user)
      avatar3 = interaction.user.displayAvatarURL({
        dynamic: false,
        format: "png",
      });
    if (user === user2) user2 = interaction.user;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let avatar2 = user2.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.distracted(avatar, avatar2, avatar3);
    let attachment = await new Discord.MessageAttachment(
      image,
      "distracted.png"
    );
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://distracted.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}