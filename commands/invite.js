exports.run = (client, message, args) => {
    message.channel.sendMessage(`https://discordapp.com/oauth2/authorize?client_id=${client.config.clientID}&scope=bot`);
}

exports.help = "Returns an invite link for this BOT";
