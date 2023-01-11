const math = require("math-expression-evaluator");
const Discord = require("discord.js");
const config = require("../../config.json")

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
        type: "STRING",
        required: true
      }
    ]
  },
  execute(interaction){
    const question = interaction.options.getString("operation")
    let answer;
    try{
      answer = math.eval(question);
    }catch{return interaction.reply({content: "Invalid mathematical equation", ephemeral: true})}
    let embed = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .addFields(
        {
          name: "Equation",
          value: `\`\`\`${question} \`\`\``
        },
        {
          name: "Answer",
          value: `\`\`\`${answer} \`\`\``
        }
      )
    interaction.reply({embeds: [embed]})
  }
}