const weather = require("weather-js");

const Discord = require("discord.js");

module.exports = {
  name: "weather",
  category: "👻 Fun Commands",
  description: "shows the current weather in a specified location",
  usage: "weather <city>",

  async run(bot, message, args) {
    weather.find(
      { search: args.join(" "), degreeType: `C` },
      function (error, result) {
        if (error) return message.channel.send(error);
        if (!args[0]) return message.channel.send("Specify the city!");

        if (result === undefined || result.length === 0)
          return message.channel.send("**INVALID** LOCATION!!");

        var current = result[0].current;
        var location = result[0].location;

        const embed = new Discord.MessageEmbed()
          .setColor(0x6200ff)
          .setAuthor(`Weather forecast for ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setDescription(`**${current.skytext}**`)
          .addField("Time zone", `UTC ${location.timezone}`, true)
          .addField("Grade Type", "`Celcius`", true)
          .addField("Temperature", `${current.temperature}°`, true)
          .addField("Wind", `${current.winddisplay}`, true)
          .addField("It feels like", `  ${current.feelslike}°`, true)
          .addField("Humidity", `${current.humidity}%`, true)

        message.channel.send(embed);
      }
    );
  },
};
