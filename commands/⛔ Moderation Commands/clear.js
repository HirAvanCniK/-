const Discord = require("discord.js");

module.exports = {
  name: `clear`,
  description: "Delete number messages",
  category: "⛔️ Moderation Commands",
  usage: "clear <number>",
  run: async (Client, message, args, prefix) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`You don't have permission`).then((msg) => { msg.delete({ timeout: 10000 }) });

    if (args[0] >= 100) {
      args[0] = 99;
      message.reply("The maximum number of messages I can delete is 99!").then((msg) => { msg.delete({ timeout: 10000 }) })
    }

    if (args[0] < 1) return message.reply("Please enter a larger number")

    let deleteAmount;

    if (!args[0]) return message.channel.send("Enter how many posts I have to delete!").then((msg) => { msg.delete({ timeout: 10000 }) });

    deleteAmount = parseInt(args[0]);

    message.channel.bulkDelete(deleteAmount + 1, true);

    var embed7 = new Discord.MessageEmbed()
      .setTitle(`Has eliminated ***${deleteAmount}*** messages.`)
      .setAuthor(message.author.username)
      .setColor(0x6200ff)
      .setTimestamp();
    message.reply(embed7)
  },
};
