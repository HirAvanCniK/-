const { msg } = require("../../functions");
const { ApplicationCommandOptionType } = require('../../index');

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
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {
        name: "title",
        description: "The title of embed",
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {
        name: "description",
        description: "The description of embed",
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {
        name: "color",
        description: "The color of embed",
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {
        name: "footer",
        description: "The footer of embed",
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {
        name: "thumbnail",
        description: "The thumbnail of embed",
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {
        name: "image",
        description: "The image of embed",
        type: ApplicationCommandOptionType.String,
        required: false
      },
      {
        name: "url",
        description: "The url of embed",
        type: ApplicationCommandOptionType.String,
        required: false
      }
    ]
  },
  async execute(interaction){
    const author = interaction.options.getString("author") || undefined;
    const title = interaction.options.getString("title") || undefined;
    const description = interaction.options.getString("description") || undefined;
    const color = interaction.options.getString("color") || undefined;
    const footer = interaction.options.getString("footer") || undefined;
    const thumbnail = interaction.options.getString("thumbnail") || undefined;
    const image = interaction.options.getString("image") || undefined;
    const url = interaction.options.getString("url") || undefined;
    
    return msg({
      interaction,
      author: author,
      title: title,
      description: description,
      color: color,
      footer: footer,
      thumbnail: thumbnail,
      image: image,
      url: url
    })
  }
};
