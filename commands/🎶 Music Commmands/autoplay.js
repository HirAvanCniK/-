const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "autoplay",
  category: "🎶 Music Commmands",
  usage: "autoplay",
  description: "Enables autoplay - random similar songs",
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
    await functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      `Autoplay is now on ${
        client.distube.toggleAutoplay(message) ? "ON" : "OFF"
      }!`
    );
    return;
  },
};
