module.exports = {
    name: "volume",
    description: "Set the volume of the song",
    category: "🎶 Music Commands",
    usage: "volume <volume>",
    data:{
        name: "volume",
        description: "Set the volume of the song",
        options: [
            {
                name: "volume",
                description: "The volume of the song",
                type: "INTEGER",
                required: true
            }
        ]
    },
    execute(interaction){}
}