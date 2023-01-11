const weather = require("weather-js");
const Discord = require("discord.js");

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
        if (error) return interaction.reply({content: error, ephemeral: true})
        if (result === undefined || result.length === 0) return interaction.reply({content: "**INVALID** LOCATION!!", ephemeral: true});
  
        var current = result[0].current;
        var location = result[0].location;
  
        const embed = new Discord.MessageEmbed()
          .setColor(0x6200ff)
          .setTitle(`Weather forecast for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setDescription(`**${current.skytext}**`)
          .addFields(
            {
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
            }
          )
        interaction.reply({embeds: [embed]})
      }
    )
  }
}