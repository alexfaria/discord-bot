const request = require('request');
const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet`;
const youtube = `https://www.youtube.com/watch?v=`;

exports.run = (client, message, args) => {

    if (!args || args.length < 1)
        return message.channel.send('Must provide a command: either `add <url>` or `list` ');

    if (args[0] === "add") {
        if (args.length < 2)
            return message.channel.send(`Must provide a song name`);

        request(endpoint + `&key=${client.config.googleAPI}&q=${args.join(' ')}`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const result = JSON.parse(body);
                const videoId = result.items[0].id.videoId;
                const title = result.items[0].snippet.title;
                const link = youtube + videoId;

                if (!client.queue[message.guild])
                    client.queue[message.guild] = []
                client.queue[message.guild].push({
                    title,
                    link
                });
                console.dir(client.queue[message.guild]);
            }
        });
    } else if (args[0] === "list") {
        let content = "\n";
        for (let i in client.queue[message.guild]) {
            content = content + client.queue[message.guild][i].title + "\n";
        }
        message.channel.send(`\`\`\`${content}\`\`\``);
    }


};

exports.help = "Add a song to the queue.";