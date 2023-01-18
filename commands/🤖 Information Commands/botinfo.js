const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
let os = require("os");
let cpuStat = require("cpu-stat");
const { msg } = require("../../functions");

module.exports = {
  name: "botinfo",
  description: "Sends detailed info about the client",
  category: "🤖 Information Commands",
  usage: "botinfo",
  data:{
    name: "botinfo",
    description: "Sends detailed info about the client"
  },
  execute(interaction){
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment.duration(interaction.client.uptime).format("D [days], H [hrs], m [mins], s [secs]");

      let connectedchannelsamount = 0;
      let guilds = interaction.client.guilds.cache.map((guild) => guild);
      for (let i = 0; i < guilds.length; i++) {
        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
      }
  
      let fields = [
        {
          name: "⏳ Memory Usage",
          value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(
            os.totalmem() /
            1024 /
            1024
          ).toFixed(2)} MB\``,
          inline: true
        },
        {
          name: "⌚️ Uptime ",
          value: `\`${duration}\``,
          inline: true
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true
        },
        {
          name: "📁 Users",
          value: `\`${interaction.client.users.cache.size}\``,
          inline: true
        },
        {
          name: "📁 Servers",
          value: `\`${interaction.client.guilds.cache.size}\``,
          inline: true
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true
        },
        {
          name: "📁 Voice-Channels",
          value: `\`${
            interaction.client.channels.cache.filter((ch) => ch.type === "voice").size
          }\``,
          inline: true
        },
        {
          name: "📁 Connected Channels",
          value: `\`${connectedchannelsamount}\``,
          inline: true
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true
        },
        {
          name: "👾 Discord.js",
          value: `\`v${version}\``,
          inline: true
        },
        {
          name: "🤖 Node",
          value: `\`${process.version}\``,
          inline: true
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true
        },
        {
          name: "🤖 CPU",
          value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``
        },
        {
          name: "🤖 CPU usage",
          value: `\`${percent.toFixed(2)}%\``,
          inline: true
        },
        {
          name: "🤖 Arch",
          value: `\`${os.arch()}\``,
          inline: true
        },
        {
          name: "\u200b",
          value: `\u200b`,
          inline: true
        },
        {
          name: "💻 Platform",
          value: `\`\`${os.platform()}\`\``,
          inline: true
        },
        {
          name: "📡 API Latency",
          value: `\`${interaction.client.ws.ping}ms\``,
          inline: true
        }
      ]

      return msg({
        interaction,
        fields: fields,
        author: interaction.client.user.username,
        title: "Stats"
      })
    })
  }
}