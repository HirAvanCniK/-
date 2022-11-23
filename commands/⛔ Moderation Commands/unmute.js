const { Message } = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Toggle mute of a member",
  category: "⛔️ Moderation Commands",
  usage: "unmute <user>",
  /**
   * @param {Message} message
   */
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);

    if (!Member) return message.reply("Member not found").then((msg) => { msg.delete({ timeout: 10000 }) });
    if (Member.id == "536798044939878403")
      return message.reply(
        "The selected user is my creator I could never mutate him"
      ).then((msg) => { msg.delete({ timeout: 10000 }) });
    if (Member.id == "867526392156258324")
      return message.reply("Oops I can't mutate myself").then((msg) => { msg.delete({ timeout: 10000 }) });
    const role = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted"
    );

    await Member.roles.remove(role);
    if (!Member.roles.cache.has(`${role.id}`))
      return message.reply(`${Member.displayName} has not mutated.`).then((msg) => { msg.delete({ timeout: 10000 }) });
    message.channel.send(`${Member.displayName} is now unmutated.`);
  },
};
