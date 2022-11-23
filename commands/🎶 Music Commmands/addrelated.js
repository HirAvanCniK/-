const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "addrelated",
  category: "🎶 Music Commmands",
  cooldown: 3,
  usage: "addrelated",
  description: "Adds a similar song of the current Track",
  run: async (client, message, args) => {
    if (!client.distube.isPlaying(message))
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "Nothing playing!"
      );
    if (!message.member.voice.channel)
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" + message.author.tag + "`" + " You must join a Voice Channel"
      );
    if (
      client.distube.isPlaying(message) &&
      message.member.voice.channel.id !==
        message.member.guild.me.voice.channel.id
    )
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" +
          message.author.tag +
          "`" +
          " You must join my Voice Channel: " +
          ` \`${
            message.member.guild.me.voice.channel.name
              ? message.member.guild.me.voice.channel.name
              : ""
          }\``
      );
    let newsong = await client.distube.addRelatedVideo(message);
    let result = newsong.songs;
    functions.embedbuilder(
      client,
      10000,
      message,
      config.colors.yes,
      "Adding:",
      `[${result[1].name}](${result[1].url})`,
      result[1].thumbnail
    );
    return client.distube.play(message, result[1].url);
    return;
  },
};
