const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const subreddits = [
  "memes",
  "DeepFriedMemes",
  "bonehurtingjuice",
  "surrealmemes",
  "dankmemes",
  "meirl",
  "me_irl",
  "funny",
];

module.exports = {
  name: "meme",
  category: "👻 Fun Commands",
  usage: `meme [user]`,
  description: "Image cmd in the style meme",
  run: async (client, message, args) => {
    const data = await fetch(
      `https://imgur.com/r/${
        subreddits[Math.floor(Math.random() * subreddits.length)]
      }/hot.json`
    )
      .then((response) => response.json())
      .then((body) => body.data);
    const selected = data[Math.floor(Math.random() * data.length)];
    return message.channel.send(
      new MessageEmbed()
        .setImage(
          `https://imgur.com/${selected.hash}${selected.ext.replace(
            /\?.*/,
            ""
          )}`
        )
        .setColor(config.colors.yes)
        .setFooter(client.user.username, config.AVATARURL)
        .setFooter(client.user.username, config.AVATARURL)
        .setTimestamp()
    );
  },
};
