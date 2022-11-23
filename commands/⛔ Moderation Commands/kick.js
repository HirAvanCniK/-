module.exports = {
  name: "kick",
  description: "Kick an user",
  category: "⛔️ Moderation Commands",
  usage: "kick <user>",
  run: (client, message) => {
    var utenteKick = message.mentions.members.first();

    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("You don't have permission").then((msg) => { msg.delete({ timeout: 10000 }) });
      return;
    }

    if (!utenteKick) {
      message.reply("You didn't mention any users").then((msg) => { msg.delete({ timeout: 10000 }) });
      return;
    }

    if (!message.mentions.members.first().kickable) {
      message.reply("I don't have permission").then((msg) => { msg.delete({ timeout: 10000 }) });
      return;
    }

    utenteKick
      .kick()
      .then(() =>
        message.channel.send("<@" + utenteKick + ">" + " has been kicked")
      );
  },
};
