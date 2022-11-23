module.exports = {
  name: "random",
  category: "📋 School Commands",
  description: "Show a random number",
  usage: "random <min. num> <max. num>",
  run: async (client, message, args) => {
    //command
    let min = args[0];
    if (!min)
      return message.reply(
        "Please include a minimum number!`"
      );
    let max = args[1];
    if (!max)
      return message.reply(
        "Please include a maximum number!`"
      );
    if (isNaN(min) || isNaN(max))
      return message.reply(
        "The parameters must be numbers!"
      );
    message.channel.send(
      `\`\`\`fix\n${getRandomInt(Number(min), Number(max))}\n\`\`\``
    );
  },
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
