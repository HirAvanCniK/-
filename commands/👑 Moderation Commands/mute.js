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
    if (!interaction.member.permissions.has("MANAGE_MESSAGES", "ADMINISTRATOR")) return interaction.reply({content: "You don't have permission", ephemeral: true})
    if (Member.id == "536798044939878403") return interaction.reply({content: "The selected user is my creator I could never mutate him", ephemeral: true})
    if (Member.id == "1046168348205006868") return interaction.reply({content: "Oops I can't mutate myself", ephemeral: true})
    const role = interaction.guild.roles.cache.find((role) => role.name.toLowerCase() === "muted");
    if (!role){
      try {
        interaction.reply("Muted role was not found, attempt to create a muted role")

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
          interaction.reply("The muted role was successfully created")
      } catch (error) {
        console.log(error);
      }
    }
    else{
      if (Member.roles.cache.has(`${role.id}`)) return interaction.reply({content: `${Member} has already mutated`, ephemeral: true})
      await Member.roles.add(role);
      interaction.reply(`${Member} is now mutated`);
    }
  }
}