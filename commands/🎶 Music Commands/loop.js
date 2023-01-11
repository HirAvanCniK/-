module.exports = {
    name: "loop",
    description: "Loop queue",
    category: "🎶 Music Commands",
    usage: "loop",
    data:{
        name: "loop",
        description: "Loop queue",
        options: [
            {
                name: "loop",
                description: "What do you want repeated?",
                type: "INTEGER",
                required: true
            }
        ]
    },
    execute(interaction){}
}