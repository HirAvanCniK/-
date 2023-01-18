const Discord = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch");
const { msg } = require("../../functions");
const { getResponseHeaders } = require("distube");

module.exports = {
  name: "wikipedia",
  category: "🔨 Utility Commands",
  description: "Search Anything on Wikipedia",
  usage: "wikipedia <Query>",
  data:{
    name: "wikipedia",
    description: "Search Anything on Wikipedia",
    options:[
      {
        name: "query",
        description: "Thing to search",
        type: "STRING",
        required: true
      }
    ]
  },
  async execute(interaction){
    const query = interaction.options.getString("query");
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    let response
    try {
      response = await fetch(url).then(res => res.json())
    }
    catch (e) {
      return msg({
        interaction,
        color: "RED",
        title: 'An Error Occured, Try Again',
        ephemeral: true
      })
    }
    try {
        if (response.type === 'disambiguation') { // If Their Are Many Results With Same Searched Topic
          return msg({
            interaction,
            title: response.title,
            url: response.content_urls.desktop.page,
            description: [`${response.extract} Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`]
          })
        }
        else {
          return msg({
            interaction,
            title: response.title,
            url: response.content_urls.desktop.page,
            thumbnail: response.thumbnail.source,
            description: response.extract
          })
        }
      }
      catch (e) {
        return msg({
          interaction,
          color: "RED",
          title: 'Provide A Valid Query To Search',
          ephemeral: true
        })
      }
  }
};
