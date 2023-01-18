const Discord = require("discord.js");
const { msg } = require("../../functions");

module.exports = {
  name: `clear`,
  description: "Delete number messages",
  category: "👑 Moderation Commands",
  usage: "clear <number>",
  data:{
    name: "clear",
    description: "Delete number messages",
    options:[
      {
        name: "messages",
        description: "Number of messages to delete",
        type: "INTEGER",
        required: true
      }
    ]
  },
  execute(interaction){
    const deleteAmount = interaction.options.getInteger("messages")
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")){
      return msg({
        interaction,
        color: "RED",
        title: "You don't have permission",
        ephemeral: true
      })
    }
    if (deleteAmount >= 100){
      return msg({
        interaction,
        color: "RED",
        title: "The MAX messages to delete is 99",
        ephemeral: true
      })
    }
    if (deleteAmount < 1){
      return msg({
        interaction,
        color: "RED",
        title: "The MIN messages to delete is 1",
        ephemeral: true
      })
    }
    try {
      interaction.channel.bulkDelete(deleteAmount + 1, true)
    }catch{
      return msg({
        interaction,
        color: "RED",
        title: "I don't have permission",
        ephemeral: true
      })
    }
    return msg({
      interaction,
      title: `Has eliminated ***${deleteAmount}*** messages.`,
      author: interaction.user.username
    })
  }
}