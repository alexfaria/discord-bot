exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.channel.send(message.author.avatarURL);
    const user = client.users.find('name', args[0]);
    if (user) return message.channel.send(user.avatarURL);
}

exports.help = "Returns the avatar of a user";