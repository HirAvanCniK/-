const Discord = require("discord.js");
const config = require("../../config.json");
const fetch = require("node-fetch");

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
      return message.reply('An Error Occured, Try Again').then((msg) => { msg.delete({ timeout: 10000 }) });
    }
    try {
        if (response.type === 'disambiguation') { // If Their Are Many Results With Same Searched Topic
          const embed = new Discord.MessageEmbed()
            .setColor(config.colors.yes)
            .setTitle(response.title) // Title Of Topic
            .setURL(response.content_urls.desktop.page) // URL Of Searched Topic
            .setDescription([`${response.extract} Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`])
          interaction.reply({embeds: [embed]})
        }
        else {
          const embed = new Discord.MessageEmbed()
          try { embed.setColor(config.colors.yes) } catch { }
          try { embed.setTitle(response.title) } catch { } // Title Of Topic
          try { embed.setURL(response.content_urls.desktop.page) } catch { } // URL Of Searched Topic
          try { embed.setThumbnail(response.thumbnail.source) } catch { }
          try { embed.setDescription(response.extract) } catch { }
          interaction.reply({embeds: [embed]})
        }
      }
      catch (e) {
        return interaction.reply('Provide A Valid Query To Search')
      }
  }
};
