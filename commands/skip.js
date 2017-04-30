exports.run = (client, message, args) => {
    const vcon = client.voiceConnections.get(message.guild.id);
    if (vcon && vcon.channel) vcon.channel.leave();
}

exports.help = "Skips the current song.";