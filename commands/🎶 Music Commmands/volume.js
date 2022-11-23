const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "volume",
  category: "🎶 Music Commmands",
  usage: "volume <volume number>",
  description: "Changes volume",
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
    if (args[0] > 100)
      return message.channel.send("Il numero inserito è troppo alto!");
    if (args[0] < 0)
      return message.channel.send("Il numero inserito è troppo basso!");
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
    if (Number(args[0]) > 100 && Number(args[0]) < 0)
      return functions.embedbuilder(
        client,
        "null",
        message,
        config.colors.no,
        "Not valid Number",
        "Please use a volume Number between `0` and `500`"
      );
    functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      "VOLUME!",
      `changed volume to \`${args[0]} %\``
    );
    await client.distube.setVolume(message, args[0]);
    return;
  },
};
