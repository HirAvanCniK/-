const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "jump",
  cooldown: 5,
  category: "🎶 Music Commmands",
  usage: "jump <Query number>",
  description: "Jump to a song in the Queue",
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
        "`" +
          message.author.tag +
          "`" +
          " Please add something you wanna search to"
      );

    let queue = client.distube.getQueue(message);
    if (!queue)
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "There is nothing playing!"
      );

    if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
      functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.yes,
        "SUCCESS",
        `Jumped ${parseInt(args[0])} songs!`
      );
      return client.distube
        .jump(message, parseInt(args[0]))
        .catch((err) => message.channel.send("Invalid song number."));
    } else {
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "ERROR",
        `Please use a number between **0** and **${
          DisTube.getQueue(message).length
        }**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`
      );
    }
  },
};
