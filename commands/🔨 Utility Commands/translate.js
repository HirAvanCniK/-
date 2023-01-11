const Discord = require("discord.js");
const config = require("../../config.json");
const translate = require("translatte");
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
        type: "STRING",
        required: true
      },
      {
        name: "to",
        description: "The language to translate",
        type: "STRING",
        required: true
      },
      {
        name: "text",
        description: "The text to translate",
        type: "STRING",
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
        let embed = new Discord.MessageEmbed()
          .setColor(config.colors.yes)
          .setThumbnail("https://imgur.com/0DQuCgg.png")
          .addFields(
            {
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
            }
          )
          interaction.reply({embeds: [embed]});
      })
      .catch((err) => {
        let embed = new Discord.MessageEmbed()
          .setColor(config.colors.yes)
          .setTitle(":x: Error | Something went wrong")
          .setDescription(String("```" + err.stack + "```").substr(0, 2000));
        interaction.reply({embeds: [embed]});
        console.log(err);
      });
  }
};
