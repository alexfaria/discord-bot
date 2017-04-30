const ytdl = require('ytdl-core');
const request = require('request');
const endpoint = "https://www.googleapis.com/youtube/v3/search";
const youtube = "https://www.youtube.com/watch?v=";

exports.run = (client, message, args) => {
    if (!args || args.length < 1)
        return message.channel.sendMessage(`Must provide a link.`);
    const vchannel = message.member.voiceChannel;
    if (!vchannel)
        return channel.sendMessage('You must be in a voice channel.');

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
        request(endpoint + `?q=${args.join(' ')}&part=snippet&key=${client.config.googleAPI}`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const result = JSON.parse(body);
                const videoId = result.items[0].id.videoId;
                const title = result.items[0].snippet.title;

                console.dir(`Playing ${title} (${videoId})`);

                const link = youtube + videoId;
                vchannel
                    .join()
                    .then((connection) => {
                        const stream = ytdl(link, {
                            audioonly: true
                        });
                        const dispatcher = connection.playStream(stream);
                        dispatcher.setVolume(0.1);
                        dispatcher.on('end', () => vchannel.leave());
                    })
                    .catch(console.log);
            }
        })
    }
}

function validURL(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

exports.help = "Play a video from youtube. Either link or search query.";