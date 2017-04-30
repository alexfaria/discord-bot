const request = require('request');

exports.run = (client, message, args) => {
  if (args[0] === 'list') {
    request('http://memegen.link/templates/', (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body);
        const arr = [];
        for (const meme in result) {
          arr.push(result[meme].substring(result[meme].lastIndexOf('/') + 1));
        }
        message.channel.sendMessage(`Available memes: ${arr.join(', ')}`);
      }
    });
  } else {
    let params = args.join(' ').split("|");
    if (params.length !== 3) {
      message.channel.sendMessage('` meme <meme> | top text | bottom text ` or ` meme list `');
      return;
    }
    for (let i = 0; i < 3; i += 1) {
      params[i] = params[i].replace(/^[ ]+|[ ]+$/g, '').split(' ').join('-');
    }
    const image = `http://memegen.link/${params[0]}/${params[1]}/${params[2]}.jpg`;
    message.channel.sendMessage(image);
  }
}

exports.help = "Meme generator.";