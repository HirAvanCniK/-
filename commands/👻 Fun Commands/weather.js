const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weather",
    description: "shows the current weather in a specified location",
    aliases: ["weather"],

    async run(bot, message, args) {
        weather.find({ search: args.join(" "), degreeType: `C` }, function (error, result) {
            if (error) return message.channel.send(error);
            if (!args[0]) return message.channel.send('Specifica la città!')

            if (result === undefined || result.length === 0) return message.channel.send('**INVALID** LOCATION!!')

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
                .setColor(0x6200FF)
                .setAuthor(`Previsioni del tempo per ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setDescription(`**${current.skytext}**`)
                .addField('Fuso orario', `UTC ${location.timezone}`, true)
                .addField('Tipo di grado', '`Celcius`', true)
                .addField('Temperatura', `${current.temperature}°`, true)
                .addField('Vento', `${current.winddisplay}`, true)
                .addField('Si sente come', `  ${current.feelslike}°`, true)
                .addField('Umidità', `${current.humidity}%`, true)
                .setImage("https://i.ibb.co/3pTPzXr/image0-1.gif")

            message.channel.send(embed)
        })
    }
}