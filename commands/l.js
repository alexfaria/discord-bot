const fs = require('fs');

exports.run = (client, message, args) => {
    if (args[0] == "list") {
        let mp3s = [];
        fs.readdir("./mp3/", (err, files) => {
            if (err) return console.error(err);
            files.forEach(file => {
                mp3s.push(file.slice(0, -4));
            });
            return message.channel.sendCode('asciidoc', `${mp3s.join('\n')}`);
        });
    }

    if (!args) return message.channel.send(`Must provide a sound name.`);
    const vchannel = message.member.voiceChannel;
    if (!vchannel) return channel.send('You must be in a voice channel.')
    console.log(message.guild.voiceConnection);
    if (!message.guild.voiceConnection) {
        vchannel.join()
            .then((connection) => {
                const dispatcher = connection.playFile(`./mp3/${args[0]}.mp3`);
                dispatcher.on('end', () => vchannel.leave());
            })
            .catch(err => console.log(err));
    }
}

exports.help = "Play a meme sound from a list of mp3 files.";