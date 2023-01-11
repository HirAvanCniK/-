const Discord = require("discord.js")
const { Configuration, OpenAIApi } = require("openai")
const { msg } = require("../../functions");
const config = require("../../config.json")
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    name: "ai",
    category: "🔨 Utility Commands",
    description: "Use the openAI Artificial Intelligence API",
    usage: "ai <query>",
    data:{
        name: "ai",
        description: "Use the openAI Artificial Intelligence API",
        options:[
            {
                name: "query",
                description: "The query to be sent to the AI",
                type: "STRING",
                required: true
            }
        ]
    },
    async execute(interaction){
        const query = interaction.options.getString("query")
        const configuration = new Configuration({
            apiKey: config.OPENAI_API_KEY
        });
        const openai = new OpenAIApi(configuration);

        try {
            const completion = await openai.createCompletion({
              model: "text-davinci-002",
              prompt: query
            });
            msg(interaction, "", [], "", completion.data.choices[0].text)
          } catch (error) {
            if (error.response) {
              console.log(error.response.status);
              console.log(error.response.data);
            } else {
              console.log(error.message);
            }
          }
    }
};