const Discord = require("discord.js");
const prefix = require("../../config.json");

module.exports = {
  name: "userinfo",
  description: "Information of a member",
  category: "🤖 Information Commands",
  usage: "userinfo",
  run: (client, message) => {
    if (message.content == `${prefix}userinfo`) {
      var utente = message.member;
    } else {
      var utente = message.mentions.members.first();
    }

    if (!utente) {
      message.channel.send("Please enter the user");
      return;
    }

    var elencoPermessi = "";
    if (utente.hasPermission("ADMINISTRATOR")) {
      elencoPermessi = "👑 ADMINISTRATOR";
    } else {
      var permessi = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
      ];

      for (var i = 0; i < permessi.length; i++) {
        if (utente.hasPermission(permessi[i])) {
          elencoPermessi += "- " + permessi[i] + "\r";
        }
      }
    }

    var embed3 = new Discord.MessageEmbed()
      .setTitle(utente.user.tag)
      .setDescription("All the information of this user")
      .setThumbnail(utente.user.avatarURL())
      .addField(":id:", "`" + utente.user.id + "`", true)
      .addField(
        ":video_game: Status ",
        "`" + utente.user.presence.status + "`",
        true
      )
      .addField(":robot: Is a bot?", utente.user.bot ? "`Yes`" : "`No`", true)
      .addField(
        ":birthday: Account created",
        "`" + utente.user.createdAt.toDateString() + "`",
        true
      )
      .addField(
        ":house_with_garden: Joined in this server",
        "`" + utente.joinedAt.toDateString() + "`",
        true
      )
      .addField(":pencil: Permissions", "`" + elencoPermessi + "`", false)
      .addField(
        ":scroll: Roles",
        "`" + utente.roles.cache.map((ruolo) => ruolo.name).join("\r- ") + "`",
        false
      )
      .setColor(0x6200ff);

    message.channel.send(embed3);
  },
};
