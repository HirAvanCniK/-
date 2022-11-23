module.exports = {
  name: "shutdown",
  description: "shutdown the bot",
  usage: "shutdown",
  category: "👑 Creator Commands",
  cooldown: 5,
  run: async (client, message, args) => {
    if (message.author.id !== "536798044939878403")
      return message.reply("You are not my creator :space_invader:");
    try {
      await message.channel
        .send("Shutdowning...")
        .then((i) => i.delete({ timeout: 5000 }));
      await message.channel
        .send("I'm offline")
        .then((i) => i.delete({ timeout: 5000 }));
      process.exit();
    } catch (e) {
      message.channel.send(`ERROR: ${e.message}`);
    }
  },
};
