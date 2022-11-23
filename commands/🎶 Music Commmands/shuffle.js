const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "shuffle",
  category: "🎶 Music Commmands",
  usage: "shuffle",
  description: "Shuffles the queue",
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

    functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      "Shuffled!"
    );
    return client.distube.shuffle(message);
  },
};
