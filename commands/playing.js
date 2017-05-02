exports.run = (client, message, args) => {
    let role = message.guild.roles.get(client.config.modRoleID);
    if (!message.member.roles.has(role.id) || message.author.id != client.config.ownerID)
        return message.channel.send(`Only members with the role ${role} may use it.`);
    const argument = message.content.substr(client.config.prefix.length + 'playing'.length);
    client.user.setGame(argument);
}

exports.help = `Change the game I'm playing. Only members with permissions may use it.`;