const Discord = require('discord.js');
const config = require("../../config.json");
const fetch = require('node-fetch');

module.exports = {
    name: "nsfw",
    category: "🔞 NSFW Commands",
    description: "Show an nsfw",
    usage: "nsfw <category>",
    data:{
      name: "nsfw",
      description: "Show an nsfw",
      options:[
        {
          name: "category",
          description: "Category of NSFW",
          type: "STRING",
          required: true
        }
      ]
    },
    async execute(interaction){
        if (!interaction.channel.nsfw) {
            let message = await interaction.reply({content: "This is not an NSFW Channel", ephemeral: true, fetchReply: true})
            return message.react("💢")
        }
        const category = interaction.options.getString("category")
        const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890"
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        for (let i = 0; i < category.length; i++) {
            if (!alphabet.includes(category[i])) return interaction.reply({content: `Character '**${category[i]}**' is not allowed`, ephemeral: true})
        }

        links = []
        const response = await fetch(`https://www.pornpics.com/${category}`);
        const body = await response.text();
        array = body.split("\n")
        for(let line in array) {
            if (array[line].includes("https://cdni.pornpics.com")) {
                link = "https://cdni.pornpics.com" + array[line].split("https://cdni.pornpics.com")[1].split('"')[0]
                links.push(link)
            }
        }

        do{
            image = links[getRndInteger(0, links.length - 1)]
        }while(image == "https://cdni.pornpics.com")
        var embed_nsfw;
        if(!image){
            embed_nsfw = new Discord.MessageEmbed()
                .setDescription(`No results found for the category '**${category}**'`)
        }else{
            embed_nsfw = new Discord.MessageEmbed()
                .setDescription(category)
                .setImage(image)
        }
        interaction.reply({embeds: [embed_nsfw]})
    }
}