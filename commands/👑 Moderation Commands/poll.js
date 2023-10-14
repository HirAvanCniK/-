const { ApplicationCommandOptionType } = require('../../index');
const { msgReacts, msg } = require("../../functions");

module.exports = {
  name: "poll",
  category: "👑 Moderation Commands",
  description: "Creates a poll",
  usage: "poll <polltext> <firstreaction> <secondreaction>",
  data:{
    name: "poll",
    description: "Creates a poll",
    options:[
      {
        name: "polltext",
        description: "The body of the poll",
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "firstreaction",
        description: "First reaction of the poll",
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "secondreaction",
        description: "Second reaction of the poll",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  execute(interaction){
    const text = interaction.options.getString("polltext") || undefined
    const firstReaction = interaction.options.getString("firstreaction") || undefined
    const secondReaction = interaction.options.getString("secondreaction") || undefined
    if(text == undefined || firstReaction == undefined || secondReaction == undefined){
      return msg({
        interaction,
        color: "RED",
        title: "Parametri mancanti",
        ephemeral: true
      })
    }else{
      try{
        return msgReacts({
          interaction,
          author: `📋 | ${interaction.guild.name}`,
          fields: [{name: '**Poll**', value: "> _" + text + "_"}],
          reactions: [firstReaction, secondReaction]
        })
      }catch(e){
        return msg({
            interaction,
            color: "RED",
            title: "Invalid emojis",
            ephemeral: true
        })
      }
    }
  }
}