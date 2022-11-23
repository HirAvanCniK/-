const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "slowmode",
  description: "Active slowmode in a text channel",
  category: "⛔️ Moderation Commands",
  usage: "slowmode <number/off>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You don't have permission").then((msg) => { msg.delete({ timeout: 10000 }) })

    if (!args[0])
      return message.reply("You did not specify a time!").then((msg) => { msg.delete({ timeout: 10000 }) })

    const currentCooldown = message.channel.rateLimitPerUser;

    const reason = args[1] ? args.slice(1).join(" ") : "no reason";

    const embed = new MessageEmbed().setFooter(
      `${message.author.tag}`,
      message.author.displayAvatarURL({ dynamic: true })
    );

    if (args[0] === "off") {
      const time = 0;
      if (currentCooldown === 0)
        return message.reply("The channel recovery time is already off").then((msg) => { msg.delete({ timeout: 10000 }) })

      embed.setTitle("Slowmode Disabled").setColor(0x6200ff);

      return message.channel
        .setRateLimitPerUser(time, reason)
        .then((m) => m.send(embed));
    }

    const time = ms(args[0]) / 1000;

    if (isNaN(time))
      return message.reply("It is not a timetable!").then((msg) => { msg.delete({ timeout: 10000 }) })

    if (time >= 21600)
      return message.reply("The slowmode limit is too high; enter a value less than 6 hours").then((msg) => { msg.delete({ timeout: 10000 }) })

    if (currentCooldown === time)
      return message.reply(`The slowmode is already set to ${args[0]}`).then((msg) => { msg.delete({ timeout: 10000 }) });

    embed
      .setTitle("Slowmode enabled")
      .addField("Slowmode: ", args[0])
      .addField("Reason: ", reason)
      .setColor(0x6200ff);

    message.channel
      .setRateLimitPerUser(time, reason)
      .then((m) => m.send(embed));
  },
};
