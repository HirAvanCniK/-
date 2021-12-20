const Discord = require('discord.js');
const prefix = require("../../config.json");

module.exports = {
    name: 'userinfo',
    description: 'Information of a member',
    aliases: ["userinfo"],
    category: "🤖 Information Commands",
    usage: "userinfo",
    run: (client, message) => {
        if (message.content == `${prefix}userinfo`) {
            var utente = message.member;
        }
        else {
            var utente = message.mentions.members.first();
        }

        if (!utente) {
            message.channel.send("Non ho trovato questo utente")
            return
        }

        var elencoPermessi = "";
        if (utente.hasPermission("ADMINISTRATOR")) {
            elencoPermessi = "👑 ADMINISTRATOR";
        }
        else {
            var permessi = ["CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "VIEW_GUILD_INSIGHTS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"]

            for (var i = 0; i < permessi.length; i++) {
                if (utente.hasPermission(permessi[i])) {
                    elencoPermessi += "- " + permessi[i] + "\r";
                }
            }
        }

        var embed3 = new Discord.MessageEmbed()
            .setTitle(utente.user.tag)
            .setDescription("Tutte le info di questo utente")
            .setThumbnail(utente.user.avatarURL())
            .addField(":id:", "`" + utente.user.id + "`", true)
            .addField(":video_game: Stato ", "`" + utente.user.presence.status + "`", true)
            .addField(":robot: È un bot?", utente.user.bot ? "`Yes`" : "`No`", true)
            .addField(":birthday: Account creato", "`" + utente.user.createdAt.toDateString() + "`", true)
            .addField(":house_with_garden: Joinato in questo server", "`" + utente.joinedAt.toDateString() + "`", true)
            .addField(":pencil: Permessi", "`" + elencoPermessi + "`", false)
            .addField(":scroll: Ruoli", "`" + utente.roles.cache.map(ruolo => ruolo.name).join("\r- ") + "`", false)
            .setColor(0x6200FF)

        message.channel.send(embed3)
    }
}