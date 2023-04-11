const config = require("../../config.json");
const sqlite3 = require('sqlite3');
const { msg } = require("../../functions");
const { ApplicationCommandOptionType } = require('../../index');

module.exports = {
    name: "reminder",
    category: "🔨 Utility Commands",
    description: "Gets the database with user reminders",
    usage: "reminder [add/remove] [thing]",
    data:{
        name: "reminder",
        description: "Gets the database with user reminders",
        options:[
            {
                name: "istruction",
                description: "What do you do",
                type: ApplicationCommandOptionType.String,
                required: false
            },
            {
                name: "object",
                description: "The object to be added/removed",
                type: ApplicationCommandOptionType.String,
                required: false
            }
        ]
    },
    execute(interaction){
        const istruction = interaction.options.getString("istruction") || undefined;
        const thing = interaction.options.getString("object") || undefined;
        let db = new sqlite3.Database('./databases/database.db', sqlite3.OPEN_READWRITE);
        if(istruction==undefined && thing==undefined){
            let desc = ""
            db.all("SELECT * FROM users WHERE id = ?", [interaction.user.id], (err, rows) => {
                if (err) {
                    throw err
                }
                if(rows[0]){
                    if(rows[0]["promemoria"] != ""){
                        for(let i in rows[0]["promemoria"].split("|")){
                            desc += `**${parseInt(i)+1}**. ${rows[0]["promemoria"].split("|")[parseInt(i)]}\n`
                        }
                    }else{desc="Your database is empty"}
                    return msg({
                        interaction,
                        title: ":ledger: Reminder :ledger:",
                        description: desc,
                        author: interaction.user.username
                    })
                }else{
                    db.run("INSERT INTO users (id, promemoria) VALUES (?, ?)", [interaction.user.id, ""], (err) => {
                        if (err) {
                            throw err
                        }
                        return msg({
                            interaction,
                            title: "Database created successfully!",
                            ephemeral: true
                        })
                    })
                }
            })
        }
        else if(istruction != undefined && thing != undefined){
            if(istruction!='add' && istruction!='remove') return msg({
                interaction,
                color: "RED",
                title: `'${istruction}' is not a function`,
                ephemeral: true
            })
            if(thing.includes("|")) return msg({
                interaction,
                color: "RED",
                title: "The character '|' cannot be entered",
                ephemeral: true
            })
            db.all("SELECT promemoria FROM users WHERE id = ?", [interaction.user.id], (err, rows) => {
                if (err) {
                    throw err
                }
                if(!rows[0]["promemoria"]){
                    return msg({
                        interaction,
                        color: "RED",
                        title: `Unable to execute actions without having created the database -> ${config.prefix}reminder`,
                        ephemeral: true
                    })
                }
                let things = rows[0]["promemoria"].split("|")
                if(istruction=="remove"){
                    if(!parseInt(thing)) return msg({
                        interaction,
                        color: "RED",
                        title: "You need to enter the index of the element you want to delete",
                        ephemeral: true
                    })
                    if(parseInt(thing)<1 || parseInt(thing)>things.length) return msg({
                        interaction,
                        color: "RED",
                        title: "The index used does not exist",
                        ephemeral: true
                    })
                    things.splice(parseInt(thing)-1, 1)
                }else{
                    things.push(thing)
                }
                db.run("UPDATE users SET promemoria = ? WHERE id = ?", [things.join("|"), interaction.user.id], (err) => {
                    if (err) {
                        throw err
                    }
                    return msg({
                        interaction,
                        description: (istruction=="add") ? `Added the element '**${thing}**' to your database` : `Removed the index element '**${thing}**' from your database`,
                        author: interaction.user.username
                    })
                })
            })
        }
        if(istruction!=undefined&&thing==undefined) return msg({
            interaction,
            color: "RED",
            title: "Please specify the thing to be inserted/removed",
            ephemeral: true
        })
        if(istruction==undefined&&thing!=undefined) return msg({
            interaction,
            olor: "RED",
            title: "Please specify the istruction",
            ephemeral: true
        })
    }
}