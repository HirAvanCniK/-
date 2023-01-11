const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Discord = require(`discord.js`);
const canvacord = require("canvacord");

module.exports = {
  name: "fuse",
  category: "👻 Fun Commands",
  usage: `fuse [user]`,
  description: "Image cmd in the style fuse",
  data:{
    name: "fuse",
    description: "Image cmd in the style fuse",
    options:[
      {
        name: "user_1",
        description: "The first user to fuse",
        type: "USER",
        required: true
      },
      {
        name: "user_2",
        description: "The second user to fuse",
        type: "USER",
        required: true
      }
    ]
  },
  async execute(interaction){
    const utente_1 = interaction.options.getUser("user_1");
    const utente_2 = interaction.options.getUser("user_2");
    var user = interaction.guild.members.cache.get(utente_1.id)
    var user2 = interaction.guild.members.cache.get(utente_2.id)
    if (user === user2) user2 = interaction.user;
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let avatar2 = user2.displayAvatarURL({ dynamic: false, format: "png" });
    let image = await canvacord.Canvas.fuse(avatar, avatar2);
    let attachment = await new Discord.MessageAttachment(image, "fuse.png");
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage("attachment://fuse.png")

    interaction.reply({embeds: [embed], files: [attachment]})

  }
}