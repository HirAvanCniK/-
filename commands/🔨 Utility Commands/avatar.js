const Discord = require("discord.js")
const config = require("../../config.json")
module.exports = {
    name: "avatar",
    category: "🔨 Utility Commands",
    description: "Gets the avatar of a user or yourself",
    usage: "avatar [user]",
    data:{
        name: "avatar",
        description: "Gets the avatar of a user or yourself",
        options:[
            {
                name: "user",
                description: "the user",
                type: "USER",
                required: true
            }
        ]
    },
    execute(interaction){
        const utente = interaction.options.getUser("user")
        var member = interaction.guild.members.cache.get(utente.id)
        if (!member.user.avatarURL) return interaction.reply({content: `That user does not have an avatar`, ephemeral: true});

        const avatar = new Discord.MessageEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setColor(config.colors.yes)
            .setImage(member.user.avatarURL())
            .setURL(member.user.avatarURL())
        interaction.reply({embeds: [avatar]})
    }
};