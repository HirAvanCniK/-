module.exports = {
  name: "remove-role",
  description: "Remove role of a member",
  category: "⛔️ Moderation Commands",
  usage: "remove-role <user> <role>",
  /**
   *
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.reply("You don't have permission").then((msg) => { msg.delete({ timeout: 10000 }) });
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.reply("I don't have permission").then((msg) => { msg.delete({ timeout: 10000 }) });

    const target = message.mentions.members.first();
    if (!target) return message.reply("You did not mention the user").then((msg) => { msg.delete({ timeout: 10000 }) });
    const role = message.mentions.roles.first();
    if (!role) return message.reply("You didn't mention the role").then((msg) => { msg.delete({ timeout: 10000 }) });
    await target.roles.remove(role);

    message.channel.send(
      `${target.user.username} no longer has the '${role}' role`
    );
  },
};
