exports.run = (client, message, args) => {
  let modRole = message.guild.roles.find("name", "Mods");
  if (!message.member.roles.has(modRole.id)) {
    return message.reply("You pleb, you don't have the permission to use this command.").catch(console.error);
  }
  if (message.mentions.users.size === 0) {
    return message.reply("Please mention a user to kick").catch(console.error);
  }
  let kickMember = message.guild.member(message.mentions.users.first());
  if (!kickMember) {
    return message.reply("That user does not seem valid");
  }
  if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
    return message.reply("I don't have the permissions (KICK_MEMBER) to do this.").catch(console.error);
  }
  kickMember.kick().then(member => {
    message.reply(`${member.user.username} was succesfully kicked.`).catch(console.error);
  }).catch(console.error)
}

exports.help = "Kick a user.";