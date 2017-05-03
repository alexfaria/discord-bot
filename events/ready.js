exports.run = (client) => {
  console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`);
  client.guilds.every((element, index, array) => {
    client.queue[element] = [];
  });

}