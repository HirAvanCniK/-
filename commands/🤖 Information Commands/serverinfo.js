const Discord = require("discord.js");

module.exports = {
  name: "serverinfo",
  description: "information of a server",
  category: "🤖 Information Commands",
  usage: "serverinfo",

  run: (client, message) => {
    var server = message.member.guild;

    var botCount = server.members.cache.filter(
      (member) => member.user.bot
    ).size;
    var utentiCount = server.memberCount - botCount;
    var verifiedBotCount = server.members.cache.filter(
      (member) => member.user.bot.verify
    ).size;

    var categoryCount = server.channels.cache.filter(
      (c) => c.type == "category"
    ).size;
    var textCount = server.channels.cache.filter((c) => c.type == "text").size;
    var voiceCount = server.channels.cache.filter(
      (c) => c.type == "voice"
    ).size;
    var region;
    var birthday;
    var embed2 = new Discord.MessageEmbed()
      .setTitle(server.name)
      .setDescription("All the information about this server")
      .setThumbnail(server.iconURL())
      .addField(
        ":crown: Administrator",
        "`" + server.owner.user.username + "`",
        true
      )
      .addField("Server :id:", "`" + server.id + "`", true)
      .addField(":map: Region", "`" + region + "`", true)
      .addField(
        ":family: Members",
        "`Totali: " +
          server.memberCount +
          " | Users: " +
          utentiCount +
          " - Bots: " +
          botCount +
          " - Verified bots: " +
          verifiedBotCount +
          "`",
        false
      )
      .addField(
        ":ticket: Channels",
        "`Categories: " +
          categoryCount +
          " | Text: " +
          textCount +
          " - Vocals: " +
          voiceCount +
          "`",
        false
      )
      .addField(
        ":birthday: Server created",
        "`" + server.createdAt.toDateString() + "`",
        true
      )
      .addField(
        ":100: Boost level",
        "`Level " +
          server.premiumTier +
          " (Boost: " +
          server.premiumSubscriptionCount +
          ")`",
        true
      )
      .setColor(0x6200ff);

    message.channel.send(embed2);
  },
};
