const config = require("./config.json");
const { Client, Collection, MessageEmbed } = require('discord.js');
const fs = require("fs");
const { msg } = require("./functions.js")
require("colors");
const client = new Client({
  intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"],
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

const { DisTube } = require("distube")
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

const distube = new DisTube(client, {
  youtubeDL: false,
  plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
  leaveOnEmpty: true,
  leaveOnStop: true,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  nsfw: true
})

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
    command.execute(interaction)
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
  if (!interaction.isSelectMenu()) return;
  let commandsName = [];
  let dir = interaction.values[0];
  const commands = fs.readdirSync(`./commands/${dir}/`).filter((file) =>
    file.endsWith(".js")
  );
  for (let file of commands) {
    let pull = require(`./commands/${dir}/${file}`);
    commandsName.push(pull.name)
  }
  var embed = new MessageEmbed()
    .setTitle(dir)
    .setDescription("➤ ***" + commandsName.join("***\n➤ ***") + "***")
  interaction.reply({embeds: [embed], ephemeral: true})
});

// Music commands
client.on("interactionCreate", interaction => {
  if (!interaction.isCommand()) return 
  var interactionEmbed = new MessageEmbed().setColor(config.colors.yes).setTimestamp()
  if (interaction.commandName == "play"){
    const song = interaction.options.getString("song")
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }
    
    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(interaction.client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }
    
    let queue = distube.getQueue(interaction)
    if (queue){
      return msg({
        interaction,
        color: "RED",
        title: "Song already running",
        ephemeral: true
      })
    }

    distube.play(voiceChannelBot || voiceChannel, song, {
        member: interaction.member,
        textChannel: interaction.channel,
        message: interaction.message
    })

    interactionEmbed.setTitle(`🎶 Searching... 🎶\n\`${song}\``)

    interaction.reply({embeds: [interactionEmbed]})
  }
  if (interaction.commandName == "stop"){
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }
    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    try{
      distube.stop(interaction).then(() => {
        interactionEmbed.setTitle("✅ Stop songs successfully")
        return interaction.reply({embeds: [interactionEmbed]})
      }).catch(() => {
        interactionEmbed.setTitle("❌ No songs playing").setColor("RED")
        return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
      })
    } catch {
      interactionEmbed.setTitle("❌ No songs playing").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  }
  if (interaction.commandName == "pause"){
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    try{
      distube.pause(interaction)
      interactionEmbed.setTitle("✅ Song paused")
      return interaction.reply({embeds: [interactionEmbed]})
    } catch {
      interactionEmbed.setTitle("❌ No song playing or song already paused").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  }
  if (interaction.commandName == "resume"){
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    try{
      distube.resume(interaction)
      interactionEmbed.setTitle("✅ Song resumed")
      return interaction.reply({embeds: [interactionEmbed]})
    } catch {
      interactionEmbed.setTitle("❌ No song playing or song already playing").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  }
  if (interaction.commandName == "skip"){
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    try{
      distube.skip(interaction).then(() => {
        interactionEmbed.setTitle("✅ Song skipped")
        return interaction.reply({embeds: [interactionEmbed]})
      }).catch(() => {
        interactionEmbed.setTitle("❌ No song playing or next song not present").setColor("RED")
        return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
      })
    } catch {
      interactionEmbed.setTitle("❌ No song playing or next song not present").setColo("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  }
  if (interaction.commandName == "previous"){
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    try{
      distube.previous(interaction).then(() => {
        interactionEmbed.setTitle("✅ Previous song")
        return interaction.reply({embeds: [interactionEmbed]})
      }).catch(() => {
        interactionEmbed.setTitle("❌ No song playing or previous song not present").setColor("RED")
        return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
      })
    } catch {
      interactionEmbed.setTitle("❌ No song playing or previous song not present").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  }
  if (interaction.commandName == "queue"){
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    let queue = distube.getQueue(interaction)

    if (!queue){
      return msg({
        interaction,
        color: "RED",
        title: "Empty queue",
        ephemeral: true
      })
    }

    var description = ""
    var index = 0
    for (let song in queue.songs){
      index++
      description += `**${index}.** ${queue.songs[song].name} ***${queue.songs[song].formattedDuration}***\n`
    }

    let embed = new MessageEmbed()
      .setTitle(":cyclone: Queue :cyclone:")
      .setDescription(description)
      .setColor(config.colors.yes)

    interaction.reply({embeds: [embed]})
  }
  if (interaction.commandName == "volume"){
    const volume = interaction.options.getInteger("volume")
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    if (volume < 0){
      interactionEmbed.setTitle("❌ The minimum value of the volume is 0").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
    if (volume > 100){
      interactionEmbed.setTitle("❌ The maximum value of the volume is 100").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  
    try{
      distube.setVolume(interaction, volume)
      interactionEmbed.setTitle(`✅ Volume set at \`${volume}%\``)
      return interaction.reply({embeds: [interactionEmbed]})
    } catch {
      interactionEmbed.setTitle("❌ No song playing").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  }
  if (interaction.commandName == "loop"){
    const what = interaction.options.getInteger("loop")
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    if (what != 0 && what != 1 && what != 2){
      return msg({
        interaction,
        color: "RED",
        title: `The argument '**${what}**' does not exist\n(0) Remove loop\n(1) Loop at song\n(2) Loop at queue`,
        ephemeral: true
      })
    }

    try{
      distube.setRepeatMode(interaction, what)
      if (what == 0) interactionEmbed.setTitle(`✅ Loop removed`)
      else if (what == 1) interactionEmbed.setTitle(`✅ Loop set at song`)
      else interactionEmbed.setTitle(`✅ Loop set at queue`)
      return interaction.reply({embeds: [interactionEmbed]})
    } catch {
      interactionEmbed.setTitle("❌ No song playing").setColor("RED")
      return interaction.reply({embeds: [interactionEmbed], ephemeral: true})
    }
  }
  if (interaction.commandName == "status"){
    const voiceChannel = interaction.member.voice.channel
    if (!voiceChannel){
      return msg({
        interaction,
        color: "RED",
        title: "You must be in a voice channel",
        ephemeral: true
      })
    }

    const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
    if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id){
      return msg({
        interaction,
        color: "RED",
        title: "Someone else is already listening to music",
        ephemeral: true
      })
    }

    let queue = distube.getQueue(interaction)
    console.log(queue.formattedCurrentTime)
  }
})

// distube.on("addSong", (queue, song) => {
//   let embed = new MessageEmbed()
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
  let embed = new MessageEmbed()
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
client.login(config.token);
