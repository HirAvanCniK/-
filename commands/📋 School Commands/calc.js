const math = require("math-expression-evaluator");
const { msg } = require("../../functions");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "calc",
  category: "📋 School Commands",
  description: "Calculate a mathematical equation",
  usage: "calc <operation>",
  data:{
    name: "calc",
    description: "Calculate a mathematical equation",
    options:[
      {
        name: "operation",
        description: "Operation to be solve",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  execute(interaction){
    const question = interaction.options.getString("operation")
    let answer;
    try{
      answer = math.eval(question);
    }catch{
      return msg({
        interaction,
        color: "RED",
        title: "Invalid mathematical equation",
        ephemeral: true
      })
    }
    return msg({
      interaction,
      fields: [{
        name: "Equation",
        value: `\`\`\`${question} \`\`\``
      },
      {
        name: "Answer",
        value: `\`\`\`${answer} \`\`\``
      }]
    })
  }
}