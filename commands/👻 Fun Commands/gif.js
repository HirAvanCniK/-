const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const rgif = require("discord-gifs");
const { msg } = require("../../functions");

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
    msg({
      interaction,
      image: rgif.randomgifs()
    })
  }
}