const request = require('request');

exports.run = (client, message, args) => {
  message.channel.startTyping();
  getPepePromise(client.config.imgurID)
    .then(url => {
      message.channel.send(url);
      message.channel.stopTyping();
    })
    .catch(console.log);

}

function getPepePromise(auth) {
  return new Promise((resolve, reject) => {
    const apiURL = 'https://api.imgur.com/3/gallery/album/SU4Qa';
    const options = {
      url: apiURL,
      headers: {
        Authorization: `Client-ID ${auth}`,
      },
    };
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const result = JSON.parse(body);
        const n = Math.floor(Math.random() * result.data.images.length);
        resolve(result.data.images[n].link);
      } else {
        reject('Something went wrong.');
      }
    });
  });
}

exports.help = "Random rare pepe.";