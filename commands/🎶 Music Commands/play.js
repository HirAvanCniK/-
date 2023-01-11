module.exports = {
    name: "play",
    description: "Play any song",
    category: "🎶 Music Commands",
    usage: "play <song>",
    data:{
        name: "play",
        description: "Play any song",
        options: [
            {
                name: "song",
                description: "The song to play",
                type: "STRING",
                required: true
            }
        ]
    },
    execute(interaction){}
}