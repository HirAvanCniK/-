const Discord = require("discord.js");

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
    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: "You don't have permission", ephemeral: true})
    if (deleteAmount >= 100) return interaction.reply({content: "The MAX messages to delete is 99", ephemeral: true})
    if (deleteAmount < 1) return interaction.reply({content: "The MIN messages to delete is 1", ephemeral: true})
    try {
      interaction.channel.bulkDelete(deleteAmount + 1, true)
    }catch{return interaction.reply({content: "I don't have permission", ephemeral: true})}
    var embed = new Discord.MessageEmbed()
      .setTitle(`Has eliminated ***${deleteAmount}*** messages.`)
      .setAuthor(interaction.user.username)
      .setColor(0x6200ff)
      .setTimestamp();
    interaction.reply({embeds: [embed]})
  }
}