const { msg } = require("../../functions");

const answers = [
  "Maybe.",
  "Certainly Not.",
  "I hope so.",
  "Not in your wildest dreams.",
  "There is a good chance.",
  "Quite likely.",
  "I think so.",
  "I hope so.",
  "I hope not.",
  "Never!",
  "Fuhgeddaboudit",
  "Ahaha! Really?",
  "Pfft.",
  "Sorry, bucko.",
  "Hell, yeah!",
  "Hell, yes.",
  "Hell to the no.",
  "The future is bleak.",
  "The future is uncertain.",
  "I would rather not say",
  "Who cares?",
  "Possibly.",
  "Never, ever, ever.",
  "There is a small chance.",
  "Yes!",
  "Y E S",
  "Ähem, no..",
  "No, straight up, no!",
];

module.exports = {
  name: "8ball",
  category: "👻 Fun Commands",
  description: "Answers a Question",
  usage: "8ball <question>?",
  data:{
    name: "8ball",
    description: "Answers a Question",
    options:[
      {
        name: "question",
        description: "The question to answer",
        type: "STRING",
        required: true
      }
    ]
  },
  execute(interaction){
    const question = interaction.options.getString("question")
    msg({
      interaction,
      title: question.endsWith("?")? `🎱 ${answers[Math.floor(Math.random() * answers.length)]}`: "🎱 ***That doesn't seems to be a Question! Please try again!***"
    })
  }
}