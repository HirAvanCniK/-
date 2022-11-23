const Discord = require("discord.js");
const config = require("../../config.json");
module.exports = {
  name: "invite",
  category: "🤖 Information Commands",
  description: "Invite the Bot to your Server",
  usage: "invite",
  run: async (client, message, args) => {
    let inviteembed = new Discord.MessageEmbed()
      .setColor(config.colors.yes)
      .setFooter(client.user.username, config.AVATARURL)
      .setTitle("Invite BOTS")
      .setDescription(`[INVITE ME NOW, thanks](${config.inviteUrl})`)
      .setFooter(client.user.username, config.AVATARURL);

    message.reply(inviteembed);
  },
};
