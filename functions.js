const Discord = require("discord.js")
const config = require("./config.json")
var convert = require('color-convert')

async function msg({interaction, color, fields, author, title, description, footer, thumbnail, image, url, ephemeral=false}){
    await interaction.client.application.fetch()
    let embed = new Discord.EmbedBuilder().setTimestamp()
    let col = (color || config.colors.yes).toLowerCase()
    let col_hex
    if(col=='red'){
        col_hex = config.colors.no
    }else if(col.includes("#")){
        col_hex = col
    }else{
        col_hex = convert.keyword.hex(col.toLowerCase())
    }
    let foot = footer || `Created by ${interaction.client.application.owner.tag}`
    try {embed.setColor(col_hex)} catch(e) {console.log(e)}
    if (author) try {embed.setAuthor({name: author})} catch(e) {console.log(e)}
    if (title) try {embed.setTitle(title)} catch(e) {console.log(e)}
    if (description) try {embed.setDescription(description)} catch(e) {console.log(e)}
    try {embed.setFooter({text: foot, iconURL: interaction.client.user.avatarURL()})} catch(e){console.log(e)}
    if (fields) try {embed.addFields(fields)} catch(e) {console.log(e)}
    if (thumbnail) try {embed.setThumbnail(thumbnail)} catch(e) {console.log(e)}
    if (image) try {embed.setImage(image)} catch(e) {console.log(e)}
    if (url) try {embed.setURL(url)} catch(e) {console.log(e)}
    return interaction.reply({embeds: [embed], ephemeral: ephemeral})
}

async function msgReacts({interaction, color, fields, author, title, description, footer, thumbnail, image, url, reactions, ephemeral=false}){
    await interaction.client.application.fetch()
    let embed = new Discord.EmbedBuilder().setTimestamp()
    let col = (color || config.colors.yes).toLowerCase()
    let col_hex
    if(col=='red'){
        col_hex = config.colors.no
    }else if(col.includes("#")){
        col_hex = col
    }else{
        col_hex = convert.keyword.hex(col.toLowerCase())
    }
    let foot = footer || `Created by ${interaction.client.application.owner.tag}`
    try {embed.setColor(col_hex)} catch(e) {console.log(e)}
    if (author) try {embed.setAuthor({name: author})} catch(e) {console.log(e)}
    if (title) try {embed.setTitle(title)} catch(e) {console.log(e)}
    if (description) try {embed.setDescription(description)} catch(e) {console.log(e)}
    try {embed.setFooter({text: foot, iconURL: interaction.client.user.avatarURL()})} catch(e){console.log(e)}
    if (fields) try {embed.addFields(fields)} catch(e) {console.log(e)}
    if (thumbnail) try {embed.setThumbnail(thumbnail)} catch(e) {console.log(e)}
    if (image) try {embed.setImage(image)} catch(e) {console.log(e)}
    if (url) try {embed.setURL(url)} catch(e) {console.log(e)}
    let message = await interaction.reply({embeds: [embed], ephemeral: ephemeral, fetchReply: true });
    reactions.forEach(element => {
        message.react(element);
    });
}

exports.msg = msg
exports.msgReacts = msgReacts
