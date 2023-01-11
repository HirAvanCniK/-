const Discord = require("discord.js");
const fetch = require("node-fetch")

module.exports = {
  name: "embed",
  category: "🔨 Utility Commands",
  description: "Sends an selfmade Embed into an channel",
  usage: 'embed ["Author"] ["Title"] ["Description"] ["COLOR"] ["Footer"]',
  data:{
    name: "embed",
    description: "Sends an selfmade Embed into an channel",
    options: [
      {
        name: "author",
        description: "The author of embed",
        type: "STRING",
        required: false
      },
      {
        name: "title",
        description: "The title of embed",
        type: "STRING",
        required: false
      },
      {
        name: "description",
        description: "The description of embed",
        type: "STRING",
        required: false
      },
      {
        name: "color",
        description: "The color of embed",
        type: "STRING",
        required: false
      },
      {
        name: "footer",
        description: "The footer of embed",
        type: "STRING",
        required: false
      },
      {
        name: "thumbnail",
        description: "The thumbnail of embed",
        type: "STRING",
        required: false
      },
      {
        name: "image",
        description: "The image of embed",
        type: "STRING",
        required: false
      }
    ]
  },
  async execute(interaction){
    const author = interaction.options.getString("author") || "Author";
    const title = interaction.options.getString("title") || "Title";
    const description = interaction.options.getString("description") || "Description";
    const color = interaction.options.getString("color") || "RANDOM";
    const footer = interaction.options.getString("footer") || "Footer";
    const thumbnail = interaction.options.getString("thumbnail") || "";
    const image = interaction.options.getString("image") || "";
    
    const embed = new Discord.MessageEmbed()
    try{ embed.setAuthor(author) } catch { }
    try{ embed.setTitle(title) } catch { }
    try{ embed.setDescription(description) } catch { }
    try{ embed.setFooter(footer) } catch { }
    try{ embed.setColor(color) } catch { }
    try {
      response = await fetch(thumbnail).then(res => res.json())
      embed.setThumbnail(thumbnail)
    } catch {}
    try {
      response = await fetch(image).then(res => res.json())
      embed.setThumbnail(image)
    } catch {}

    interaction.reply({embeds: [embed]})
  }
};
