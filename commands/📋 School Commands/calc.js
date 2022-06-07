const utils = require('../../utils');

const math = require('math-expression-evaluator');
const stripIndents = require('common-tags').stripIndents;
module.exports = {
  name: "calc",
  aliases: ["calculate"],
  category: "📋 School Commands",
  description: "Calcola un'equazione matematica",
  usage: "[command | input]",
  run: async (client, message, args) => {
  //command
  
  if(args.length < 1)
  return message.reply(`Devi fornire un'equazione da risolvere sulla calcolatrice`);

const question = args.join(' ');

let answer;
if(question.indexOf('9 + 10') > -1) {
  answer = '21';
} else {
  try {
      answer = math.eval(question);
  } catch (err) {
      message.channel.send(`Equazione matematica non valida: ${err}`);
  }
}

message.channel.send({
  embed: utils.embed('', stripIndents`
  **Equation:**\n\`\`\`\n${question}\n\`\`\`
  **Answer:**\n\`\`\`\n${answer}\n\`\`\`
  `)
});
  }
  };