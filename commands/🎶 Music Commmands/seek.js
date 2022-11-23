const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "seek",
  category: "🎶 Music Commmands",
  usage: "seek <duration>",
  description: "Moves in the Song in: seconds",
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

    if (!args[0])
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        "`" + message.author.tag + "`" + "Please add the amount you wanna seek"
      );
    functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      "Seeked!",
      `seeked the song to \`${args[0]} seconds\``
    );
    client.distube.seek(message, Number(args[0] * 1000));
    return;
  },
};
