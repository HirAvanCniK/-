const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "resume",
  category: "🎶 Music Commmands",
  usage: "resume",
  description: "Resume the song",
  run: async (client, message, args) => {
    if (!client.distube.isPaused(message))
      return functions.embedbuilder(
        client,
        "null",
        message,
        config.colors.no,
        "Not paused!"
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

    functions.embedbuilder(client, 3000, message, config.colors.yes, "Resume!");
    return client.distube.resume(message);
  },
};
