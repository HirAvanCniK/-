const functions = require("../../functions");
const config = require("../../config.json");

module.exports = {
  name: "pulsator",
  category: "♨️ Music-Filter Commands",
  usage: `pulsator`,
  description: "It is a filter that can be added to a song",
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

    const queue = client.distube.getQueue(message);
    if (queue.dispatcher === null)
      return functions.embedbuilder(
        client,
        3000,
        message,
        config.colors.no,
        "Nothing Playing!",
        "If it is a Stream, than you sometimes you cannot add a Filter"
      );
    let filter = message.content.slice(config.prefix.length).split(" ")[0];
    if (
      message.content.slice(config.prefix.length).split(" ")[0] === queue.filter
    )
      filter = "clear";
    filter = await client.distube.setFilter(message, filter);
    await functions.embedbuilder(
      client,
      3000,
      message,
      config.colors.yes,
      "Adding filter!",
      filter
    );
    await functions.delay(5000);
  },
};
