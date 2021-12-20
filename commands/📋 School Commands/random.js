module.exports = {
  name: "random",
  aliases: ["randomnum"],
  category: "📋 School Commands",
  description: "Mostra un numero casuale",
  usage: "random <MIN. NUM> <MAX. NUM>",
  run: async (client, message, args) => {
  //command
  let min = args[0];
  if(!min) return message.reply("Si prega di includere un numero minimo! Usage: `//random <MIN. NUM> <MAX. NUM>`")
  let max = args[1];
  if(!max) return message.reply("Si prega di includere un numero massimo! Usage: `//random <MIN. NUM> <MAX. NUM>`")
  if(isNaN(min) || isNaN(max))return message.reply("I parametri DEVONO essere numeri! Usage: `//random <MIN. NUM> <MAX. NUM>`")
  message.channel.send(`\`\`\`fix\n${getRandomInt(Number(min), Number(max))}\n\`\`\``)  
  }
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}