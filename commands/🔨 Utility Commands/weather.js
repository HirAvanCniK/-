const weather = require("weather-js");
const Discord = require("discord.js");
const { msg } = require("../../functions");

module.exports = {
  name: "weather",
  category: "🔨 Utility Commands",
  description: "Shows the current weather in a specified location",
  usage: "weather <city>",
  data:{
    name: "weather",
    description: "Shows the current weather in a specified location",
    options: [
      {
        name: "city",
        description: "The city",
        type: "STRING",
        required: true
      }
    ]
  },
  execute(interaction){
    const city = interaction.options.getString("city");
    weather.find(
      { search: city, degreeType: `C` },
      function (error, result) {
        if (error){
          return msg({
            interaction,
            color: "RED",
            title: error,
            ephemeral: true
          })
        }
        if (result === undefined || result.length === 0) {
          return msg({
            interaction,
            color: "RED",
            title: "**INVALID** LOCATION!!",
            ephemeral: true
          })
        }
  
        var current = result[0].current;
        var location = result[0].location;
  
        return msg({
          interaction,
          title: `Weather forecast for ${current.observationpoint}`,
          thumbnail: current.imageUrl,
          description: `**${current.skytext}**`,
          fields: [{
            name: "Time zone",
            value: `UTC ${location.timezone}`,
            inline: true
          },
          {
            name: "Grade Type",
            value: "`Celcius`",
            inline: true
          },
          {
            name: "Temperature",
            value: `${current.temperature}°`,
            inline: true
          },
          {
            name: "Wind",
            value: `${current.winddisplay}`,
            inline: true
          },
          {
            name: "It feels like",
            value: `  ${current.feelslike}°`,
            inline: true
          },
          {
            name: "Humidity",
            value: `${current.humidity}%`,
            inline: true
          }]
        })
      }
    )
  }
}