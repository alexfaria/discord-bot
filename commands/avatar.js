exports.run = (client, message, args) => {
    if (!args || args.length < 1)   return message.channel.sendMessage(message.author.avatarURL);
    const user = client.users.find('name', args[0]);
    if (user) return message.channel.sendMessage(user.avatarURL);
}

exports.help = "Returns the avatar of a user";