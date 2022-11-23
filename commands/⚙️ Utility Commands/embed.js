const Discord = require("discord.js");
const fetch = require("node-fetch");
const { Thumbnail } = require("youtube-sr");

module.exports = {
  name: "embed",
  category: "⚙️ Utility Commands",
  description: "Sends an selfmade Embed into an channel",
  usage: 'embed <channel> ["Author"] ["Title"] ["Description"] ["COLOR"] ["Footer"]',
  run: (client, message, args) => {
    // Send Message In Channel You Want To
    const channel = message.mentions.channels.first();
    if (!channel) return message.reply("Provide A Channel To Send Embed").then((msg) => { msg.delete({ timeout: 10000 }) });;
    // args = args.split('" "')
    args.shift();
    input = args.join(" ").slice(1, -1);
    inputs = [];
    for (let i in input.split('" "')) {
      inputs.push(input.split('" "')[i]);
    }

    let embed = new Discord.MessageEmbed()
      .setAuthor(inputs[0] || message.author.username)
      .setTitle(inputs[1] || "")
      .setDescription(inputs[2] || "")
      .setFooter(inputs[4] || "")
      .setColor(inputs[3] || "");

    channel.send(embed);
  },
};
