const request = require('request');
const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet`;
const youtube = `https://www.youtube.com/watch?v=`;

exports.run = (client, message, args) => {
    
    if (!args || args.length < 1)
        return message.channel.sendMessage(`Must provide a song name`);

    request(endpoint + `&key=${client.config.googleAPI}&q=${args.join(' ')}`, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            const videoId = result.items[0].id.videoId;
            const title = result.items[0].snippet.title;
            const link = youtube + videoId;

            if (!client.queue[message.guild])
                client.queue[message.guild] = []
            client.queue[message.guild].push({title, link});


            console.dir(client.queue[message.guild]);

        }
    });


};

exports.help = "Add a song to the queue.";