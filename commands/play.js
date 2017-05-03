const ytdl = require('ytdl-core');
const request = require('request');
const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet`;
const youtube = "https://www.youtube.com/watch?v=";

exports.run = (client, message, args) => {
    if (!args || args.length < 1)
        return message.channel.send(`Must provide a link or a song name`);

    const vchannel = message.member.voiceChannel;
    if (!vchannel)
        return message.channel.send('You must be in a voice channel.');

    const vcon = client.voiceConnections.get(message.guild.id);
    if (vcon && vcon.channel)
        return message.channel.send(`A song is already playing. Please add to the queue instead.`);

    request(endpoint + `&key=${client.config.googleAPI}&q=${args.join(' ')}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            const title = result.items[0].snippet.title;
            const link = youtube + result.items[0].id.videoId;

            const song = {
                title,
                link
            }

            client.queue[message.guild].push(song);

            play(client.queue[message.guild], message, vchannel, song);
        }
    })
}

function play(queue, message, vchannel, song) {
    vchannel
        .join()
        .then((connection) => {
            const stream = ytdl(song.link, {
                audioonly: true
            });
            const dispatcher = connection.playStream(stream);
            dispatcher.setVolume(0.1);
            console.dir(`[command:play] Playing ${song.title}`);
            message.channel.send(`Playing ${song.title}`);
            dispatcher.on('end', () => {
                console.dir(queue);
                if (queue.length < 1) {
                    message.channel.send("Queue is empty. Leaving channel");
                    return vchannel.leave();
                }
                song = queue.pop();
                play(queue, message, vchannel, song);
            });
        })
        .catch(console.log);
}

exports.help = "Play a video from youtube. Either link or search query.";