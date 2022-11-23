///////////////MODULES///////////////
/////////////////////////////////////
//LOADING CONFIG FOR QUICK
const config = require("./config.json");
////////////
const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const DisTube = require("distube");
const Canvas = require("canvas");
Canvas.registerFont("Genta.ttf", { family: "Genta" });
//creating the client
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  intents: ["GUILDS", "GUILD_MESSAGES"],
  messageCacheMaxSize: 10,
  shards: "auto",
  shardCount: 5,
  disableEveryone: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const dbs = require("discord-buttons");
dbs(client);
const { MessageMenuOption, MessageMenu } = require("discord-buttons");
client.commands = new Collection();
client.queue = new Map();
client.aliases = new Collection();
const cooldowns = new Collection();
//audiosetups
client.distube = new DisTube(client, {
  youtubeCookie: config.cookie,
  searchSongs: true,
  emitNewSongOnly: true,
  highWaterMark: 1024 * 1024 * 64,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  leaveOnStop: true,
  searchSongs: false,
  youtubeDL: true,
  updateYouTubeDL: false,
  customFilters: config.customs,
});
client.setMaxListeners(0);
require("events").defaultMaxListeners = 0;
//Externalfiles setups
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

const setups = require("./handlers/setups");
setups(client);

const counter = require("./modules/counter");
counter(client);
const jointocreate = require("./modules/jointocreate");
jointocreate(client);
const membercount = require("./modules/membercount");
membercount(client);
const reactionrole = require("./modules/reactionrole");
reactionrole(client);
const apply = require("./modules/apply");
apply(client);
const radiomodule = require("./modules/radiomodule");
radiomodule(
  client,
  "738019408982573137",
  "738019409527963682" /*, radiostation, volume*/
);
const logger = require("./modules/logger");
logger.all(client);

const functions = require("./functions");
//databases setups
const Enmap = require("enmap");
client.settings = new Enmap({
  name: "settings",
  dataDir: "./databases/settings",
});
client.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" });
client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos" });
client.custom = new Enmap({ name: "custom", dataDir: "./databases/playlist" });
client.custom2 = new Enmap({
  name: "custom",
  dataDir: "./databases/playlist2",
});
client.reactionrole = new Enmap({
  name: "reactionrole",
  dataDir: "./databases/reactionrole",
});
client.apply = new Enmap({ name: "apply", dataDir: "./databases/apply" });

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  let prefix = client.settings.get(message.guild.id, `prefix`);
  if (prefix === null) prefix = config.prefix;

  if (
    !message.content.startsWith(prefix) &&
    message.content.includes(client.user.id)
  )
    message.reply(
      new Discord.MessageEmbed()
        .setColor(config.colors.yes)
        .setAuthor(
          `${message.author.username}, My prefix is ${prefix}, to get started; type ${prefix}help`,
          message.author.displayAvatarURL({ dynamic: true }),
          config.inviteUrl
        )
    );
  if (!message.content.startsWith(prefix)) return;

  if (client.settings.get(message.guild.id, `botchannel`).toString() !== "") {
    if (
      !client.settings
        .get(message.guild.id, `botchannel`)
        .includes(message.channel.id) &&
      !message.member.hasPermission("ADMINISTRATOR")
    ) {
      let leftb = "";
      for (
        let i = 0;
        i < client.settings.get(message.guild.id, `botchannel`).length;
        i++
      ) {
        leftb +=
          "<#" +
          client.settings.get(message.guild.id, `botchannel`)[i] +
          "> / ";
      }
      return functions.embedbuilder(
        client,
        5000,
        message,
        config.colors.no,
        `Not in the Bot Chat!`,
        `There is a Bot chat setup in this GUILD! try using the Bot Commands here: 
              > ${leftb}`
      );
    }
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 200;
        return message.reply(
          `Please wait ${timeLeft.toFixed(
            1
          )} more second(s) before reusing the \`${command.name}\` command.`
        );
      }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    client.infos.set(
      "global",
      Number(client.infos.get("global", "cmds")) + 1,
      "cmds"
    );
    try {
      command.run(client, message, args, prefix);
    } catch (error) {
      var data = new Date();
      console.log(
        `Errore avvenuto alle ${data.getHours()}:${data.getMinutes()} ${data.getDate()}/${
          data.getMonth() + 1
        }/${data.getFullYear()} dal comando '${message.content}'\n${error.message}`
      );
    }
  } else return message.reply(`Unkown command, try: ${prefix}help`);
});

client.login(config.token);
