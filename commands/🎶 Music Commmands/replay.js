const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "replay",
  category: "🎶 Music Commmands",
  usage: "replay",
  description: "Replays the current song",
  run: async (client, message, args) => {
    if (!message.member.voice.channel)
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" + message.author.tag + "`" + " You must join a Voice Channel"
      );

    if (!client.distube.isPlaying(message)) {
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.yes,
        "ERROR",
        "There is nothing playing"
      );
    }
    let queue = client.distube.getQueue(message);
    if (!queue)
      return embedbuilder(
        "null",
        message,
        config.colors.no,
        "There is nothing playing!"
      );

    let cursong = queue.songs[0];
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
    functions.embedbuilder(
      client,
      5000,
      message,
      config.colors.yes,
      "Replaying current song:",
      `[${cursong.name}](${cursong.url})`,
      cursong.thumbnail
    );

    return client.distube.playSkip(message, cursong.url);
  },
};
