module.exports = {
  name: "ban",
  description: "Ban an user",
  category: "⛔️ Moderation Commands",
  usage: "ban <user>",
  run: (client, message) => {
    var utenteban = message.mentions.members.first();

    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.reply("You don't have permission").then((msg) => { msg.delete({ timeout: 10000 }) });
      return;
    }

    if (!utenteban) {
      message.reply("You didn't mention the user").then((msg) => { msg.delete({ timeout: 10000 }) });
      return;
    }

    if (!message.mentions.members.first().kickable) {
      message.reply("I don't have permission").then((msg) => { msg.delete({ timeout: 10000 }) });
      return;
    }

    utenteban
      .ban()
      .then(() =>
        message.channel.send("<@" + utenteban + ">" + " has been banned")
      );
  },
};
