const { MessageEmbed } = require("discord.js");
const Discord = require(`discord.js`);
const config = require("../../config.json");
const canvacord = require("canvacord");

module.exports = {
  name: "phub",
  category: "👻 Fun Commands",
  usage: `phub [user] [text]`,
  description: "Image cmd in the style phub",
  data:{
    name: "phub",
    description: "Image cmd in the style phub",
    options:[
      {
        name: "user",
        description: "The user to phub",
        type: "USER",
        required: true
      },
      {
        name: "text",
        description: "The text to phub",
        type: "STRING",
        required: false
      }
    ]
  },
  async execute(interaction){
    const utente = interaction.options.getUser("user");
    var user = interaction.guild.members.cache.get(utente.id)
    var messg = interaction.options.getString("text");
    if (!messg) messg = "NO MESSAGE SET!";
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.phub({
      username: user.user.username,
      message: messg,
      image: avatar,
    });
    let attachment = await new Discord.MessageAttachment(image, "phub.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://phub.png")

    interaction.reply({embeds: [embed], files: [attachment]})
  }
}