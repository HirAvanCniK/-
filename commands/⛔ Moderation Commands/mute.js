const { Message } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute an user",
  category: "⛔️ Moderation Commands",
  usage: "mute <user>",
  /**
   * @param {Message} message
   */
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES", "ADMINISTRATOR"))
      return message.reply(
        "You don't have permission"
      ).then((msg) => { msg.delete({ timeout: 10000 }) });
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
      (role) => role.name.toLowerCase() === "muted"
    );
    if (!role) {
      try {
        message.reply(
          "Muted role was not found, attempt to create a muted role"
        ).then((msg) => { msg.delete({ timeout: 10000 }) });

        let muterole = await message.guild.roles.create({
          data: {
            name: "muted",
            permissions: [],
          },
        });
        message.guild.channels.cache
          .filter((c) => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
        message.reply("The muted role was successfully created").then((msg) => { msg.delete({ timeout: 10000 }) });
      } catch (error) {
        console.log(error);
      }
    }
    let role2 = message.guild.roles.cache.find(
      (r) => r.name.toLowerCase() === "muted"
    );
    if (Member.roles.cache.has(`${role2.id}`))
      return message.reply(`${Member.displayName} has already mutated`).then((msg) => { msg.delete({ timeout: 10000 }) });
    await Member.roles.add(role2);
    message.channel.send(`${Member.displayName} is now mutated`);
  },
};
