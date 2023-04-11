const { msg } = require("../../functions");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "say",
  category: "👻 Fun Commands",
  description: "Says text",
  usage: "say <text>",
  data:{
    name: "say",
    description: "Says text",
    options:[
      {
        name: "text",
        description: "The text to say",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  execute(interaction){
    const txt = interaction.options.getString("text");
    msg({
      interaction,
      description: txt
    })
  }
}