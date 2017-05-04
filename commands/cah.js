const request = require('request');
let url = "http://www.crhallberg.com/cah/json/output.php";

exports.run = (client, message, args) => {
    url += "decks%5B%5D=Base&decks%5B%5D=CAHe1&decks%5B%5D=CAHe2&decks%5B%5D=CAHe3&decks%5B%5D=CAHe4&decks%5B%5D=CAHe5&decks%5B%5D=CAHe6&decks%5B%5D=greenbox&decks%5B%5D=90s&decks%5B%5D=Box&decks%5B%5D=fantasy&decks%5B%5D=food&decks%5B%5D=science&decks%5B%5D=www&decks%5B%5D=hillary&decks%5B%5D=trumpvote&decks%5B%5D=trumpbag&decks%5B%5D=xmas2012&decks%5B%5D=xmas2013&decks%5B%5D=PAXE2013&decks%5B%5D=PAXP2013&decks%5B%5D=PAXE2014&decks%5B%5D=PAXEP2014&decks%5B%5D=PAXPP2014&decks%5B%5D=PAX2015&decks%5B%5D=HOCAH&decks%5B%5D=reject&decks%5B%5D=reject2&decks%5B%5D=Canadian&decks%5B%5D=misprint&type=JSON";
    request(url, (error, response, body) => {
        // if (!error && response.statusCode === 200) {
            const result = JSON.parse(body);
            console.dir(result);
        // }
    });
}

exports.help = "Get a random Cards Against Humanity question and answer.";