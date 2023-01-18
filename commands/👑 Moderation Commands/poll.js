const Discord = require("discord.js");
const config = require("../../config.json");
const { msg } = require("../../functions");

module.exports = {
  name: "poll",
  category: "👑 Moderation Commands",
  description: "Creates a poll",
  usage: "poll <polltext>",
  data:{
    name: "poll",
    description: "Creates a poll",
    options:[
      {
        name: "polltext",
        description: "The body of the poll",
        type: "STRING",
        required: true
      }
    ]
  },
  async execute(interaction){
    const msg = interaction.options.getString("polltext")
    let embed = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .setAuthor(`📋 | ${interaction.guild.name}`)
      .addField("\u200b", msg)
      .setFooter(`From: ${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
    const message = await interaction.reply({embeds: [embed], fetchReply: true});
    message.react("✅");
    message.react("❌");
  }
}