const Discord = require("discord.js");
module.exports = {
    name: "embed",
    category: "⚙️ Utility Commands",
    description: "Sends an selfmade Embed into an channel",
    usage: "embed <channel> <example> or <channel> <Title_Title> <Description_Description> <Footer_Footer> <COLOR> <Thumbnail-Link> <Image-Link>",
    run: async (client, message, args) => {
        // Send Message In Channel You Want To 
        const channel = message.mentions.channels.first()
        if(!channel) return message.reply('Provide A Channel To Send Embed') // If No Channel Is Provided
        const title = args[1]
        const description = args[2]
        const footer = args[3]
        const color = args[4]
        const thu = args[5]
        const image = args[6]
        const author = message.author.username
        // Embed Options

        const embedE = new Discord.MessageEmbed()
            .setAuthor(author)
            .setTitle("Title")
            .setDescription("Description\n\n<-- Color")
            .setFooter("Footer")
            .setColor("GREEN")
            .setThumbnail("https://i.ibb.co/G2zb9m8/unknown.png")
            .setImage("https://i.ibb.co/7gY0qjf/unknown.png")

        if(title == "example") return channel.send(embedE).then(msg =>{
            try{
                if(msg.channel.type === "news")
                msg.crosspost()
           } catch (error) {
               console.error(error)
           }  
        })
        if(!title) return message.reply('Provide Title For Embed.') // If No Title Is Provided
        if(!description) return message.reply('Provide Description For Embed.') // If No Description Is Provided
        if(!footer) return message.reply('Provide Footer For Embed.') // If No Footer Is Provided
        if(!color) return message.reply('Provide Color For Embed.') // If No Color Is Provided
        if(!thu) return message.reply('Provide Thumbnail-link For Embed.') // If No Thumbnail Is Provided
        if(!image) return message.reply('Provide Image-link For Embed.') // If No Image Is Provided

        // Send Embed
        const embed = new Discord.MessageEmbed()
        .setAuthor(author)
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setFooter(footer)
        .setImage(image)
        .setThumbnail(thu)
         
        channel.send(embed).then(msg =>{
            try{
                if(msg.channel.type === "news")
                msg.crosspost()
           } catch (error) {
               console.error(error)
           }  
        })
    }
}