const ytdl = require('ytdl-core');
const fs = require('fs');
const request = require('request');
const endpoint = "https://www.googleapis.com/youtube/v3/search";
const youtube = "https://www.youtube.com/watch?v=";

exports.run = (client, message, args) => {
    if(!args || args.length < 1) return message.channel.sendMessage(`Must provide a link.`);
    const vchannel = message.member.voiceChannel;
    if (!vchannel) return channel.sendMessage('You must be in a voice channel.');
    
    request(endpoint + `?q=${args.join(' ')}&part=snippet&key=${client.config.googleAPI}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            console.dir(result.items[0].id.videoId);
            
            const link = youtube + result.items[0].id.videoId;
            
            ytdl(link, { audioonly: true })
            .pipe(fs.createWriteStream('./cache/cache.mp3'))
            .on('finish', () => {
                vchannel.join()
                .then((connection) => {
                    console.log('[play] finished download');
                    const dispatcher = connection.playFile('./cache/cache.mp3');
                    dispatcher.setVolume(0.1);
                    dispatcher.on('end', () => vchannel.leave());
                })
                .catch(console.log);
            })
        }
    })
}   


function validURL(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

exports.help = "Play a video from youtube. Either link or search query.";