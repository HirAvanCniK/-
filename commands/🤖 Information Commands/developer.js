const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: "developer",
  category: "🤖 Information Commands",
  description: "Shows Information about the Developer",
  usage: "developer",
  run: async (client, message, args) => {
    const embed = new MessageEmbed()
      .setColor(config.colors.yes)
      .setFooter("🤖𝕋ℍ𝔼 𝕊𝕌ℙℝ𝔼𝕄𝔼 𝔹𝕆𝕋🤖", config.AVATARURL)
      .setTimestamp()
      .setThumbnail(config.creatorAvatar)
      .setTitle("𝓗ir𝓐van𝓒ni𝓚#1840").setDescription(`
> Hello I am **IRVANNI** <@536798044939878403> *(\`𝓗ir𝓐van𝓒ni𝓚#1840\`)*,

> I am a developer of websites, applications or bots etc... [SEE IT](https://irvanni.ga/)

> I hope you like my stuff :v: :heart:

`);
    message.channel.send(embed).catch((error) => console.log(error));
  },
};
