const { msg } = require("../../functions");

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
        if (!member.user.avatarURL) {
            return msg({
                interaction,
                color: "RED",
                title: `That user does not have an avatar`,
                ephemeral: true
            })
        }

        return msg({
            interaction,
            title: `${member.user.username}'s Avatar`,
            image: member.user.avatarURL(),
            url: member.user.avatarURL()
        })
    }
};