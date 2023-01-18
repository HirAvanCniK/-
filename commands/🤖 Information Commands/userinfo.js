const { msg } = require("../../functions");

module.exports = {
  name: "userinfo",
  description: "Information of a member",
  category: "🤖 Information Commands",
  usage: "userinfo [user]",
  data:{
    name: "userinfo",
    description: "Information of a member",
    options:[
      {
        name: "user",
        description: "The user to get information",
        type: "USER",
        required: false
      }
    ]
  },
  execute(interaction) {
    const user = interaction.options.getUser("user") || "";
    var utente;
    if (user != ""){
      utente = interaction.guild.members.cache.get(user.id)
    }
    else{
      utente = interaction.guild.members.cache.get(interaction.user.id)
    }
    var elencoPermessi = "";
    if (utente.permissions.has("ADMINISTRATOR")) {
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
        try{
          if (utente.permissions.has(permessi[i])) {
            elencoPermessi += "- " + permessi[i] + "\r";
          }
        }catch{}
      }
    }

    let flds = [{
      name: ":id:",
      value: "`" + utente.user.id + "`",
      inline: true
    },
    {
      name: ":hash: Discriminator",
      value: "`" + utente.user.tag.split("#")[1] + "`",
      inline: true
    },
    {
      name: ":robot: Is a bot?",
      value: utente.user.bot ? "`Yes`" : "`No`",
      inline: false
    },
    {
      name: ":birthday: Account created",
      value: "`" + utente.user.createdAt.toDateString() + "`",
      inline: true
    },
    {
      name: ":house_with_garden: Joined in this server",
      value: "`" + utente.joinedAt.toDateString() + "`",
      inline: true
    },
    {
      name: ":pencil: Permissions",
      value: "`" + elencoPermessi + "`",
      inline: false
    },
    {
      name: ":scroll: Roles",
      value: utente.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).join(", "),
      inline: false
    }]

    return msg({
      interaction,
      fields: flds,
      author: utente.user.username,
      thumbnail: utente.user.avatarURL()
    })
  }
}