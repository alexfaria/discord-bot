const ytdl = require('ytdl-core');
const request = require('request');
const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet`;
const youtube = "https://www.youtube.com/watch?v=";

exports.run = (client, message, args) => {
    if (!args || args.length < 1)
        return message.channel.sendMessage(`Must provide a link or a song name`);

    const vchannel = message.member.voiceChannel;
    if (!vchannel)
        return message.channel.sendMessage('You must be in a voice channel.');

    const vcon = client.voiceConnections.get(message.guild.id);
    if (vcon && vcon.channel)
        return message.channel.sendMessage(`A song is already playing. Please add to the queue instead`);

    if (validURL(args[0])) {
        vchannel
            .join()
            .then((connection) => {
                const stream = ytdl(args[0], {
                    audioonly: true
                });
                const dispatcher = connection.playStream(stream);
                dispatcher.setVolume(0.1);
                dispatcher.on('end', () => vchannel.leave());
            })
            .catch(console.log);
    } else {
        request(endpoint + `&key=${client.config.googleAPI}&q=${args.join(' ')}`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const result = JSON.parse(body);
                const videoId = result.items[0].id.videoId;
                const title = result.items[0].snippet.title;
                const link = youtube + videoId;

                const song = {
                    title,
                    link
                }

                play(client, message, vchannel, song);

                // vchannel
                //     .join()
                //     .then((connection) => {
                //         const stream = ytdl(link, {
                //             audioonly: true
                //         });
                //         const dispatcher = connection.playStream(stream);
                //         dispatcher.setVolume(0.1);
                //         console.dir(`[command:play] Playing ${title} (${videoId})`);
                //         message.channel.sendMessage(`Playing ${title}`);
                //         dispatcher.on('end', () => {
                //             const song = client.queue[message.guild].pop();
                //             vchannel.leave()
                //         });
                //     })
                //     .catch(console.log);
            }
        })
    }
}

function play(client, message, vchannel, song) {
    vchannel
        .join()
        .then((connection) => {
            const stream = ytdl(song.link, {
                audioonly: true
            });
            const dispatcher = connection.playStream(stream);
            dispatcher.setVolume(0.1);
            console.dir(`[command:play] Playing ${song.title}`);
            message.channel.sendMessage(`Playing ${song.title}`);
            dispatcher.on('end', () => {
                if (Object.keys(client.queue[message.guild]).length === 0)
                    return;    
                song = client.queue[message.guild].pop();
                play(client, message, vchannel, song);
            });
        })
        .catch(console.log);
}


function validURL(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

exports.help = "Play a video from youtube. Either link or search query.";