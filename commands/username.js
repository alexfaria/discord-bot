exports.run = (client, message, args) => {
    let role = message.guild.roles.get(client.config.modRoleID);
    if (!(message.member.roles.has(role.id) || message.author.id == client.config.ownerID))
        return message.channel.send(`Only members with the role ${role} may use it.`);

    const argument = message.content.substr(client.config.prefix.length + 'username'.length + 1);

    if (validURL(argument)) {
        console.log("Setting a new avatar");
        client.user.setAvatar(argument)
            .then(user => console.log(`New avatar set!`))
            .catch(console.error);
    } else {
        console.log("Setting a new username");
        client.user.setUsername(argument);
    }
}

exports.help = `Change my username or avatar. Only members with permissions may use it.`;

function validURL(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}