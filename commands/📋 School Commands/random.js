const { msg } = require("../../functions");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "random",
  category: "📋 School Commands",
  description: "Show a random number",
  usage: "random <min. num> <max. num>",
  data:{
    name: "random",
    description: "Show a random number",
    options:[
      {
        name: "min",
        description: "Minimum number",
        type: ApplicationCommandOptionType.Integer,
        required: true
      },
      {
        name: "max",
        description: "Maximum number",
        type: ApplicationCommandOptionType.Integer,
        required: true
      }
    ]
  },
  execute(interaction){
    const nMin = interaction.options.getInteger("min")
    const nMax = interaction.options.getInteger("max")
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    return msg({
      interaction,
      title: `\`${getRandomInt(nMin, nMax)}\``
    })
  }
}