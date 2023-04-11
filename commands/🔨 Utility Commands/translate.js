const translate = require("translatte");
const { msg } = require("../../functions");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
  name: "translate",
  category: "🔨 Utility Commands",
  description: "Translates a Text from a Language to another Language",
  usage: "translate <from> <to> <TEXT>",
  data:{
    name: "translate",
    description: "Translates a Text from a Language to another Language",
    options: [
      {
        name: "from",
        description: "The language from translate",
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "to",
        description: "The language to translate",
        type: ApplicationCommandOptionType.String,
        required: true
      },
      {
        name: "text",
        description: "The text to translate",
        type: ApplicationCommandOptionType.String,
        required: true
      }
    ]
  },
  execute(interaction){
    const from = interaction.options.getString("from")
    const to = interaction.options.getString("to")
    const text = interaction.options.getString("text")
    translate(text, {from: from, to: to})
      .then((res) => {
        return msg({
          interaction,
          thumbnail: "https://imgur.com/0DQuCgg.png",
          fields: [{
            name: `From: \`${from}\``.substr(0, 256),
            value: text
          },
          {
            name: "\u200B",
            value: "\u200B"
          },
          {
            name: `To: \`${to}\``.substr(0, 256),
            value: res.text.substr(0, 1024)
          }],
        })
      })
      .catch((err) => {
        return msg({
          interaction,
          color: "RED",
          title: ":x: Error | Something went wrong",
          description: String("```" + err.stack + "```").substr(0, 2000),
          ephemeral: true
        })
        console.log(err);
      });
  }
};
