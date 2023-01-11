const Discord = require("discord.js")
const config = require("./config.json")

module.exports = {
    msg: async function(interaction, color, fields, author, title, description, footer, thumbnail, image, ephemeral=false){
        await interaction.client.application.fetch()
        let embed = new Discord.MessageEmbed()
        try {embed.setColor(color || config.colors.yes)} catch(e) {console.log(e)}
        if (author) try {embed.setAuthor(author)} catch(e) {console.log(e)}
        if (title) try {embed.setTitle(title)} catch(e) {console.log(e)}
        if (description) try {embed.setDescription(description)} catch(e) {console.log(e)}
        try {embed.setFooter(footer || `Created by ${interaction.client.application.owner.tag}`, interaction.client.user.avatarURL())} catch(e) {console.log(e)}
        if (fields) try {embed.addFields(fields)} catch(e) {console.log(e)}
        if (thumbnail!="") try {embed.setThumbnail(thumbnail)} catch(e) {console.log(e)}
        if (image!="") try {embed.setImage(image)} catch(e) {console.log(e)}
        interaction.reply({embeds: [embed], ephemeral: ephemeral})
    }
}
