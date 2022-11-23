const radio = require("../../modules/radio");
const config = require("../../config.json");
module.exports = {
  name: "radio",
  category: "🎶 Music Commmands",
  usage: "radio [radiostation] [volume]",
  description:
    "Play one of the 200 Radio Station, or see them by just typing  +radio  in the chat!",
  run: async (client, message, args) => {
    if (client.distube.isPlaying(message) && args[0]) {
      client.distube.stop(message);

      return radio(client, message, args); //get the radio module
    } else {
      return radio(client, message, args); //get the radio module
    }
  },
};
