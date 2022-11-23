const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "forward",
  category: "🎶 Music Commmands",
  usage: "forward <DURATION>",
  description: "Forwards the Song forward: seconds",
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
    let queue = client.distube.getQueue(message);
    if (!queue)
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "Nothing playing!"
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
          "Please add the amount you wanna rewind"
      );

    let seektime2 = queue.currentTime + Number(args[0]) * 1000;
    if (seektime2 >= queue.songs[0].duration * 1000) {
      seektime2 = queue.songs[0].duration * 1000 - 1;
    }
    client.distube.seek(message, Number(seektime2));
    functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      "FORWARD!",
      `Forwarded the song for \`${Number(args[0])} seconds\``
    );
    return;
  },
};
