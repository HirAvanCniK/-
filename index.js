var colors = require('colors');
///////////////MODULES///////////////
/////////////////////////////////////
//LOADING CONFIG FOR QUICK
const config = require("./config.json");
////////////
const { Client, Collection } = require("discord.js");
const Discord = require('discord.js'); 
const fs = require("fs");
const DisTube = require("distube");
const Canvas = require('canvas');
Canvas.registerFont("Genta.ttf", { family: "Genta" }); //loading a font
//creating the client
const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    intents: ["GUILDS", "GUILD_MESSAGES"],
    messageCacheMaxSize: 10,
    shards: "auto",
    shardCount: 5,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
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
    highWaterMark: 1024*1024*64,
    leaveOnEmpty: true,
    leaveOnFinish: true,
    leaveOnStop: true,
    searchSongs: false,
    youtubeDL: true,
    updateYouTubeDL: false,
    customFilters: config.customs
})
client.setMaxListeners(0);
require('events').defaultMaxListeners = 0;
//Externalfiles setups
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

const setups = require("./handlers/setups");
    setups(client);


const counter = require("./modules/counter"); counter(client);
const jointocreate = require("./modules/jointocreate");jointocreate(client);
const membercount = require("./modules/membercount"); membercount(client); 
const reactionrole = require("./modules/reactionrole"); reactionrole(client); 
const apply = require("./modules/apply"); apply(client); 
const radiomodule = require("./modules/radiomodule"); radiomodule(client, "738019408982573137", "738019409527963682"/*, radiostation, volume*/);
const logger = require("./modules/logger"); logger.all(client);  

const functions = require("./functions")
//databases setups
const Enmap = require("enmap");
client.settings = new Enmap({ name: "settings", dataDir: "./databases/settings" }); 
client.setups = new Enmap({ name: "setups", dataDir: "./databases/setups" }); 
client.infos = new Enmap({ name: "infos", dataDir: "./databases/infos" }); 
client.custom = new Enmap({ name: "custom", dataDir: "./databases/playlist" }); 
client.custom2 = new Enmap({ name: "custom", dataDir: "./databases/playlist2" }); 
client.reactionrole = new Enmap({ name: "reactionrole", dataDir: "./databases/reactionrole" }); 
client.apply = new Enmap({ name: "apply", dataDir: "./databases/apply" })
//registering a command setup

client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    //GET THE PREFIX
    let prefix = client.settings.get(message.guild.id, `prefix`);
    if (prefix === null) prefix = config.prefix;           //if not prefix set it to standard prefix in the config.json file

    if (!message.content.startsWith(prefix) && message.content.includes(client.user.id))
        message.reply(new Discord.MessageEmbed().setColor(config.colors.yes).setAuthor(`${message.author.username}, My prefix is ${prefix}, to get started; type ${prefix}help`, message.author.displayAvatarURL({ dynamic: true }), "https://discord.com/oauth2/authorize?client_id=867526392156258324&scope=bot&permissions=1095216660215"));
    if(!message.content.startsWith(prefix)) return;
    
    const { inspect } = require('util');
    if (message.content.startsWith(prefix + "eval")) { //if cmd == eval
        const evalargs = message.content.split(' ');
        evalargs.shift();
        //Allowed user:
        if (message.author.id !== '536798044939878403') return;
        let evaled;
        try {
            if(evalargs.join(' ').includes("token")) return console.log("ERROR NO TOKEN GRABBING ;)");
            evaled = await eval(evalargs.join(' '));
            if(evaled.toString().includes(client.token)) return console.log("ERROR NO TOKEN GRABBING ;)"); //just to be 100% sure
            return message.channel.send("\`\`\`" + inspect(evaled) + "\`\`\`");
        }
        catch (error) {
            console.log(error.toString().red);
            return message.reply('there was an error during evaluation.');
        }
    }
    //CHECK IF IN A BOT CHANNEL OR NOT
    if(client.settings.get(message.guild.id, `botchannel`).toString()!==""){
        if (!client.settings.get(message.guild.id, `botchannel`).includes(message.channel.id) && !message.member.hasPermission("ADMINISTRATOR")) {
            let leftb = "";
            for(let i = 0; i < client.settings.get(message.guild.id, `botchannel`).length; i++){
                leftb  +="<#" +client.settings.get(message.guild.id, `botchannel`)[i] + "> / "
            }       
            return functions.embedbuilder(client,5000, message, config.colors.no, `Not in the Bot Chat!`, `There is a Bot chat setup in this GUILD! try using the Bot Commands here: 
            > ${leftb}`)
        }
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) 
        {
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
                  `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
                );
              }
            }
          
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            client.infos.set("global", Number(client.infos.get("global", "cmds")) + 1, "cmds");
            try{
                command.run(client, message, args, prefix);
            }catch (error){}
        }
    else
        return message.reply(`Unkown command, try: ${prefix}help`)
});
//message help 
client.on("message", async message => {
    if(!message.guild || message.author.bot) return;

    if (message.content == config.prefix + "help" || message.content == config.prefix + "HELP" || message.content == config.prefix + "Help" || message.content == config.prefix + "HElp" || message.content == config.prefix + "HeLp" || message.content == config.prefix + "HelP" || message.content == config.prefix + "hElp" || message.content == config.prefix + "hELp" || message.content == config.prefix + "hElP" || message.content == config.prefix + "heLp" || message.content == config.prefix + "heLP" || message.content == config.prefix + "helP") {
        let option1 = new MessageMenuOption()
            .setLabel("Music-Filter Commands")
            .setValue("Option 1")
            .setDefault()
            .setEmoji("♨️")
        let option2 = new MessageMenuOption()
            .setLabel("Utility Commands")
            .setValue("Option 2")
            .setDefault()
            .setEmoji("⚙️")
        let option3 = new MessageMenuOption()
            .setLabel("Moderation Commands")
            .setValue("Option 3")
            .setDefault()
            .setEmoji("⛔")
        let option4 = new MessageMenuOption()
            .setLabel("Game Commands")
            .setValue("Option 4")
            .setDefault()
            .setEmoji("🎮")
        let option5 = new MessageMenuOption()
            .setLabel("Music Commmands")
            .setValue("Option 5")
            .setDefault()
            .setEmoji("🎶")
        let option6 = new MessageMenuOption()
            .setLabel("Creator Commands")
            .setValue("Option 6")
            .setDefault()
            .setEmoji("👑")
        let option7 = new MessageMenuOption()
            .setLabel("Fun Commands")
            .setValue("Option 7")
            .setDefault()
            .setEmoji("👻")
        let option8 = new MessageMenuOption()
            .setLabel("School Commands")
            .setValue("Option 8")
            .setDefault()
            .setEmoji("📋")
        let option9 = new MessageMenuOption()
            .setLabel("NSFW Commands")
            .setValue("Option 9")
            .setDefault()
            .setEmoji("🔞")
        let option10 = new MessageMenuOption()
            .setLabel("Information Commands")
            .setValue("Option 10")
            .setDefault()
            .setEmoji("🤖")
        let selection = new MessageMenu()
            .setID("Selection")
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder("Click here to choose which commands to view!")
            .addOption(option1)
            .addOption(option2)
            .addOption(option3)
            .addOption(option4)
            .addOption(option5)
            .addOption(option6)
            .addOption(option7)
            .addOption(option8)
            .addOption(option9)
            .addOption(option10)
        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM").setTitle("HELP MENÙ!")

        let menumsg = await message.channel.send(embed, selection)
        function menuselection(menu) {
            switch(menu.values[0]) {
                case "Option 1":
                const embed1 = new Discord.MessageEmbed()
                      .setTitle("♨️ Music-Filter Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ 8d***\n***➤ bassboost***\n***➤ echo***\n***➤ flanger***\n***➤ gate***\n***➤ haas***\n***➤ heavybass***\n***➤ karaoke***\n***➤ lightbass***\n***➤ mcompand***\n***➤ nightcore***\n***➤ phaser***\n***➤ pulsator***\n***➤ purebass***\n***➤ reverse***\n***➤ subboost***\n***➤ surrounding***\n***➤ treble***\n***➤ tremolo***\n***➤ vaporwave***\n***➤ vibrato***`)
                    menu.reply.send(embed1, true)
                break;
                case "Option 2": 
                const embed2 = new Discord.MessageEmbed()
                      .setTitle("⚙️ Utility Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ avatar***\n***➤ info***\n***➤ sleeptimer***\n***➤ translate***\n***➤ wiki***`)
                    menu.reply.send(embed2, true)
                break;
                case "Option 3": 
                const embed3 = new Discord.MessageEmbed()
                      .setTitle("⛔ Moderation Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ addrole***\n***➤ ban***\n***➤ clear***\n***➤ kick***\n***➤ mute***\n***➤ pool***\n***➤ removerole***\n***➤ slowmode***\n***➤ tempmute***\n***➤ unmute***`)
                    menu.reply.send(embed3, true)
                break;
                case "Option 4": 
                const embed4 = new Discord.MessageEmbed()
                      .setTitle("🎮 Game Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ hangman***\n***➤ titactoe***`)
                    menu.reply.send(embed4, true)
                break;
                case "Option 5": 
                const embed5 = new Discord.MessageEmbed()
                      .setTitle("🎶 Music Commmands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ addrelated***\n***➤ autoplay***\n***➤ botplaylist***\n***➤ custom***\n***➤ forward***\n***➤ jump***\n***➤ loop***\n***➤ lyrics***\n***➤ mycustom***\n***➤ nowplaying***\n***➤ pause***\n***➤ play***\n***➤ playskip***\n***➤ queue***\n***➤ radio***\n***➤ replay***\n***➤ resume***\n***➤ rewind***\n***➤ search***\n***➤ searchrelated***\n***➤ searchsc***\n***➤ seek***\n***➤ shuffle***\n***➤ skip***\n***➤ status***\n***➤ stop***\n***➤ volume***`)
                    menu.reply.send(embed5, true)
                break;
                case "Option 6": 
                const embed6 = new Discord.MessageEmbed()
                      .setTitle("👑 Creator Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ shutdown***`)
                    menu.reply.send(embed6, true)
                break;
                case "Option 7": 
                const embed7 = new Discord.MessageEmbed()
                      .setTitle("👻 Fun Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ 8ball***\n***➤ affect***\n***➤ beautiful***\n***➤ bed***\n***➤ blur***\n***➤ burn***\n***➤ changemymind***\n***➤ circle***\n***➤ convolute***\n***➤ delete***\n***➤ distracted***\n***➤ facepalm***\n***➤ food***\n***➤ fuse***\n***➤ gif***\n***➤ hack***\n***➤ hitler***\n***➤ invert***\n***➤ jail***\n***➤ kiss***\n***➤ meme***\n***➤ ohno***\n***➤ phub***\n***➤ rip***\n***➤ say***\n***➤ shit***\n***➤ stonks***\n***➤ time***\n***➤ trash***\n***➤ trigger***\n***➤ trivia***\n***➤ wanted***\n***➤ wasted***\n***➤ weather***`)
                    menu.reply.send(embed7, true)
                break;
                case "Option 8": 
                const embed8 = new Discord.MessageEmbed()
                      .setTitle("📋 School Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ calc***\n***➤ random***`)
                    menu.reply.send(embed8, true)
                break;
                case "Option 9": 
                const embed9 = new Discord.MessageEmbed()
                      .setTitle("🔞 NSFW Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ anal***\n***➤ ass***\n***➤ boobs***\n***➤ feet***\n***➤ futa***\n***➤ gonewild***\n***➤ hass***\n***➤ hboobs***\n***➤ hentai_anal***\n***➤ hkitsune***\n***➤ hmidriff***\n***➤ hthigh***\n***➤ hyuri***\n***➤ neko***\n***➤ paizuri***\n***➤ porn***\n***➤ pussy***\n***➤ swimsuit***\n***➤ tentacle***\n***➤ thigh***`)
                    menu.reply.send(embed9, true)
                break;
                case "Option 10": 
                const embed10 = new Discord.MessageEmbed()
                      .setTitle("🤖 Information Commands")
                      .setFooter(`To see command descriptions and inforamtion, type: ${config.prefix}help [CMD NAME]`, client.user.displayAvatarURL())
                      .setDescription(`***➤ botinfo***\n***➤ developer***\n***➤ help***\n***➤ invite***\n***➤ ping***\n***➤ roleinfo***\n***➤ serverinfo***\n***➤ support***\n***➤ uptime***\n***➤ userinfo***`)
                    menu.reply.send(embed10, true)
                break;
            }
        }

        client.on("clickMenu", (menu) => {
            if(menu.message.id == menumsg.id) {
                if(menu.clicker.user.id == message.author.id) menuselection(menu)
                else menu.reply.send(":x: you are not allowed to pick something", true)
            }
        })
    }
})

client.login(config.token);
