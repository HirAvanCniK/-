const { msg } = require("../../functions");

module.exports = {
  name: "serverinfo",
  description: "information of a server",
  category: "🤖 Information Commands",
  usage: "serverinfo",
  data:{
    name: "serverinfo",
    description: "information of a server"
  },
  execute(interaction){
    var server = interaction.member.guild;

    var roles = server.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
    var emojis = server.emojis.cache.sort((a, b) =>b.position - a.position).map(emoji => emoji.toString());
  
    var categoryCount = server.channels.cache.filter((c) => c.type == "GUILD_CATEGORY").size;
    var textCount = server.channels.cache.filter((c) => c.type == "GUILD_TEXT").size;
    var voiceCount = server.channels.cache.filter((c) => c.type == "GUILD_VOICE").size;
    const owner = interaction.guild.members.cache.find(member => member.id === interaction.guild.ownerId);

    let flds = [{
      name: ":crown: Administrator",
      value: "<@" + owner + ">",
      inline: true
    },
    {
      name: "Server :id:",
      value: "`" + server.id + "`",
      inline: true
    },
    {
      name: ":map: Region",
      value: "`" + interaction.guild.preferredLocale + "`",
      inline: true
    },
    {
      name: ":ticket: Channels",
      value: "`Categories: " + categoryCount + " | Text: " + textCount + " - Vocals: " + voiceCount + "`",
      inline: false
    },
    {
      name: ":family: Members",
      value: "`Totals: " + server.memberCount + "`",
      inline: true
    },
    {
      name: ":birthday: Server created",
      value: "`" + server.createdAt.toDateString() + "`",
      inline: true
    },
    {
      name: ":white_check_mark: Verification level",
      value: "`" + server.verificationLevel + "`",
      inline: false
    },
    {
      name: ":100: Boost level",
      value: "`Level " + server.premiumTier + " (Boost: " + server.premiumSubscriptionCount + ")`",
      inline: true
    },
    {
      name: ":joy: Emojis",
      value: emojis.join(', ')
    },
    {
      name: "ㅤ",
      value: '\u200b'
    },
    {
      name: `:performing_arts: Roles`,
      value: roles.join(', ')
    }]

    return msg({
      interaction,
      fields: flds,
      title: server.name,
      thumbnail: server.iconURL()
    })
  }
}