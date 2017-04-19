exports.run = (client, message, args) => {
    let role = message.guild.roles.get(client.config.modRoleID);
    if(!message.member.roles.has(role.id) || message.author.id != client.config.ownerID)
        return message.channel.sendMessage(`Only members with the role ${role} may use it.`);
    process.exit();
}

exports.help = `Shuts down the bot so it may reboot.`;