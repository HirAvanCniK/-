const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "stop",
  category: "🎶 Music Commmands",
  usage: "stop",
  description: "Stops playing and leaves the channel",
  run: async (client, message, args) => {
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

    functions.embedbuilder(
      client,
      "null",
      message,
      config.colors.no,
      "STOPPED!",
      `Left the channel`
    );
    try {
      client.distube.stop(message);
    } catch {}
    try {
      message.member.voice.channel.leave();
    } catch (error) {}
  },
};
