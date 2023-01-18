const { msg } = require("../../functions");

module.exports = {
  name: "mute",
  description: "Mute an user",
  category: "👑 Moderation Commands",
  usage: "mute <user>",
  data:{
    name: "mute",
    description: "Mute an user",
    options:[
      {
        name: "user",
        description: "The user to mute",
        type: "USER",
        required: true
      }
    ]
  },
  async execute(interaction){
    const user = interaction.options.getUser("user")
    const Member = interaction.guild.members.cache.get(user.id)
    if (!interaction.member.permissions.has("MANAGE_MESSAGES", "ADMINISTRATOR")){
      return msg({
        interaction,
        color: "RED",
        title: "You don't have permission",
        ephemeral: true
      })
    }
    if (Member.id == "536798044939878403"){
      return msg({
        interaction,
        color: "RED",
        title: "The selected user is my creator I could never mutate him",
        ephemeral: true
      })
    }
    if (Member.id == "1046168348205006868"){
      return msg({
        interaction,
        color: "RED",
        title: "Oops I can't mutate myself",
        ephemeral: true
      })
    }
    const role = interaction.guild.roles.cache.find((role) => role.name.toLowerCase() === "muted");
    if (!role){
      try {
        return msg({
          interaction,
          title: "Muted role was not found, attempt to create a muted role"
        })

        let muterole = await interaction.guild.roles.create({
          data: {
            name: "muted",
            permissions: [],
          },
        });
        interaction.guild.channels.cache
          .filter((c) => c.type === "text")
          .forEach(async (channel, id) => {
            await channel.createOverwrite(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
            });
          });
          return msg({
            interaction,
            title: "The muted role was successfully created"
          })
      } catch (error) {
        console.log(error);
      }
    }
    else{
      if (Member.roles.cache.has(`${role.id}`)){
        return msg({
          interaction,
          color: "RED",
          title: `${Member} has already mutated`,
          ephemeral: true
        })
      }
      await Member.roles.add(role);
      return msg({
        interaction,
        title: `${Member} is now mutated`
      })
    }
  }
}