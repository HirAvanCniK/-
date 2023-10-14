const config = require("./config.json");
const { Client, Collection, EmbedBuilder, GatewayIntentBits, ApplicationCommandOptionType } = require('discord.js');
const fs = require("fs");
const { msg } = require("./functions.js")
require("colors");
require("dotenv").config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

exports.ApplicationCommandOptionType = ApplicationCommandOptionType;

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

global.distube = new DisTube(client, {
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin({ update: true })],
  leaveOnEmpty: true,
  leaveOnStop: true,
  leaveOnFinish: true,
  // emitNewSongOnly: true,
  // nsfw: true
})

// exports.distube = distube;

let stateswitch = false;

client.commands = new Collection()
const cooldowns = new Collection();

// Commands handler
const commandsFolder = fs.readdirSync("./commands");
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on("ready", () => {
  setInterval(() => {
    stateswitch = !stateswitch; //change state
    if (stateswitch){
      client.user.setActivity(
        `${config.prefix}help | IRVANNI`,
        {type: "COMPETING"}
      );
    }
    else{
      client.user.setActivity(
        `${client.guilds.cache.reduce((c, g) => c + g.memberCount, 0)} User | ${client.guilds.cache.size} Server`,
        {type: "WATCHING"}
      );
    }
  }, 5000); //5 second delay
  client.guilds.cache.forEach(guild => {
    client.commands.forEach(command => {
        guild.commands.create(command.data)
    })
  })
  var errors = 0
  console.log("╻–––––––––––––––––––––––––––╻–––––––––––––––––––––––––––╻––––––––––––––╻")
  console.log("|         Category          |          Command          |     Load?    |")
  console.log("|–––––––––––––––––––––––––––|–––––––––––––––––––––––––––|––––––––––––––|")
  let cmd, spazioCat, spazioName, stringaCat, stringaName, load;
  for (let command of client.commands){
    stringaCat = "";
    stringaName = "";
    load = " E R R O R ❌ ".bold.red;
    errors++
    cmd = command[1]
    spazioCat = 27 - cmd.category.length;
    spazioName = 27 - cmd.name.length;
    for(let i=0; i < spazioCat; i++){
      stringaCat += " ";
    }
    for(let i=0; i < spazioName; i++){
      stringaName += " ";
    }
    if(cmd.description && cmd.usage && cmd.data.name && cmd.data.description && cmd.execute){
      load = " R E A D Y ✅ ".bold.green;
      errors--
    }
    console.log("|" + cmd.category.cyan + stringaCat + "|" + cmd.name.blue + stringaName + "|" + load + "|")
  }
  console.log("╹–––––––––––––––––––––––––––╹–––––––––––––––––––––––––––╹––––––––––––––╹")
  if(errors!=0){
    console.log(`There are ${errors} commands that have errors`.bold.red)
  }
  console.log(`${client.user.username} is Online 🟢`.bold.yellow)
  console.log("╻––––––––––––––––––––╻––––––––––––––––––╻––––––––––––-------------")
  console.log("|        When        |     Command      |           Who           ")
  console.log("|––––––––––––––––––––|––––––––––––––––––|––––––––––––-------------")
})

// Execute command
client.on("interactionCreate", interaction => {
  if (!interaction.isCommand()) return
  const command = client.commands.get(interaction.commandName)
  if (!command) return
  if(command){
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return msg({
          interaction,
          title: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
          ephemeral: true
        })
      }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
  }
  try{
    command.execute(interaction);
    var date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    let when = `${day}/${month+1}/${year} ${hour}:${minutes}`
    let cmd = command.name
    let who = interaction.user.tag
    
    let spazioWhen = 20-when.length
    let spazioCmd = 18-cmd.length

    let WhenRem = spazioWhen%2
    let CmdRem = spazioCmd%2

    let spazioWhenL = (spazioWhen-WhenRem)/2
    let spazioWhenR = spazioWhen-spazioWhenL
    let spazioCmdL = (spazioCmd-CmdRem)/2
    let spazioCmdR = spazioCmd-spazioCmdL

    let s1="", s2="", s3="", s4=""
    for(let i=0; i<spazioWhenL; i++){
      s1+=" "
    }
    for(let i=0; i<spazioWhenR; i++){
      s2+=" "
    }
    for(let i=0; i<spazioCmdL; i++){
      s3+=" "
    }
    for(let i=0; i<spazioCmdR; i++){
      s4+=" "
    }

    let stringaWhen = `${s1}${when}${s2}`.bold
    let stringaCmd = `${s3}${cmd}${s4}`.bold.green
    let stringaWho = `   ${who}`.bold.yellow

    console.log(`|${stringaWhen}|${stringaCmd}|${stringaWho}`)
  } catch (e) {
    console.log(e)
    return msg({
      interaction,
      color: "RED",
      title: `The execution of '${command.name}' command was not successful, it will be fixed soon :grin:`,
      ephemeral: true
    })
  }
})

// Respond select help menu
client.on('interactionCreate', interaction => {
  if (!interaction.isStringSelectMenu()) return;
  let commandsName = [];
  let dir = interaction.values[0];
  const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );
  for (let file of commands) {
    let pull = require(`./commands/${dir}/${file}`);
    commandsName.push(pull.name)
  }
  return msg({
    interaction: interaction,
    title: dir,
    description: "➤ ***" + commandsName.join("***\n➤ ***") + "***",
    ephemeral: true
  })
});

// distube.on("addSong", (queue, song) => {
//   let embed = new EmbedBuilder()
//       .setTitle("Song added")
//       .addField("Song", song.name)

//   queue.textChannel.send({ embeds: [embed] })
// })

distube.on("playSong", (queue, song) => {
  let volume = "";
  if (queue.volume == 0) volume = ":mute:"
  else if (queue.volume < 20) volume = ":speaker:"
  else if (queue.volume <= 50) volume = ":sound:"
  else volume = ":loud_sound:"
  let embed = new EmbedBuilder()
      .setTitle("🎧 Playing song 🎧")
      .setThumbnail(song.thumbnail)
      .addFields(
          {
              name: ":bulb: Requested by",
              value: song.user.toString(),
              inline: true
          },
          {
              name: ":mirror_ball: Song",
              value: `> [\`${song.name}\`](${song.url})`,
              inline: true
          },
          {
              name: ":stopwatch: Duration",
              value: "> `" + song.formattedDuration + "`",
              inline: true
          },
          {
              name: `${volume} Volume`,
              value: "> `" + queue.volume + "%`",
              inline: true
          },
          {
              name: ":cyclone: Queue",
              value: "> `" + queue.songs.length + " songs left - " + queue.formattedDuration + "`",
              inline: true
          }
      )
      .setColor(config.colors.yes)
  queue.textChannel.send({ embeds: [embed], ephemeral: true})
})

distube.on("searchNoResult", (message, query) => {
  message.channel.send("Canzone non trovata")
})

// Login
client.login(process.env.TOKEN);
