exports.run = (client, message, args) => {
    const vcon = client.voiceConnections.get(message.guild.id);
    if (vcon && vcon.channel) vcon.disconnect();
}

exports.help = "Skips the current song.";