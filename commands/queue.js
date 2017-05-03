const request = require('request');
const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet`;
const youtube = `https://www.youtube.com/watch?v=`;

exports.run = (client, message, args) => {

    if (!args || args.length < 1)
        return message.channel.send('Must provide a valid command: either `add <url>` or `list` ');

    let queue = client.queue[message.guild];

    if (args[0] === "add") {
        if (args.length < 2)
            return message.channel.send(`Must provide a song name`);

        request(endpoint + `&key=${client.config.googleAPI}&q=${args.join(' ')}`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const result = JSON.parse(body);
                const title = result.items[0].snippet.title;
                const link = youtube + result.items[0].id.videoId;       

                queue.push({
                    title,
                    link
                });
                console.dir(queue);
            }
        });
    } else if (args[0] === "list") {
        if (queue.length < 1)
            return message.channel.send(`Queue is empty.`);
        let content = "\n";
        for (let i in queue) {
            content += `[${i}]: ${queue[i].title}\n`;
        }
        message.channel.send(`\`\`\`asciidoc${content}\`\`\``);
    } else if (args[0] === "rm") {
        if (args.length < 2)
            return message.channel.send(`Must provide an index of the queue to remove.`);
        queue.splice(args[1], 1);

    } else if (args[0] === "clear") {
        queue.splice(0, queue.length);
        message.channel.send("Cleared the queue");
    } else {
        return message.channel.send('Must provide a valid command: either `add <url>` or `list` ');
    }


};

exports.help = "Add/remove a song to the queue. Subcommands: `add`, `rm`, and `list`";