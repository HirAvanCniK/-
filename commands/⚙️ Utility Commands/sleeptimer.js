const functions = require("../../functions");
const config = require("../../config.json");
module.exports = {
  name: "sleeptimer",
  category: "⚙️ Utility Commands",
  usage: "sleeptimer <Duration in Hours>",
  description: "Sets a sleep timer which will stop the bot / leave the channel, and kick you out of the channel after the hours of duration you set",
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
        ` \`${message.member.guild.me.voice.channel.name
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
        'Please add the amount of "sleep" you wanna add, in hours please.'
      );
    functions.embedbuilder(
      client,
      "null",
      message,
      config.colors.no,
      "Sleeptimer set",
      `I will leave the Channel in \`${args[0]}hours\``
    );
    setTimeout(() => {
      functions.embedbuilder(
        client,
        "null",
        message,
        config.colors.no,
        "STOPPED!",
        `Left the channel`
      );
      let voicestate = message.member.voice;
      try {
        voicestate.setChannel(null);
        message.author.send(`Sleep well, ${message.author} :zzz:`);
      } catch { }

      try {
        client.distube.stop(message);
      } catch { }

      try {
        voicestate.channel.leave();
      } catch { }
    }, Number(args[0]) * 1000 * 60 * 60);
  },
};
