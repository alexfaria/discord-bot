exports.run = (client, member) => {
  // let guild = member.guild;
  // guild.defaultChannel.send(`Welcome ${member.user} to this server.`).catch(console.error);
  let role = member.guild.roles.find("position", 1)
  member.addRole(role);
}