const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const rgif = require("discord-gifs");
module.exports = {
  name: "gif",
  category: "👻 Fun Commands",
  usage: `gif`,
  description: "Random gif",
  data:{
    name: "gif",
    description: "Random gif"
  },
  execute(interaction){
    let embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setImage(rgif.randomgifs())
    interaction.reply({embeds: [embed]})
  }
}