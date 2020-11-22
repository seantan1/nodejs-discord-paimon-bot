module.exports = {
    name: 'emote',
    description: "command for using free emotes!",
    execute(client, message, args) {
        var emote = client.emojis.cache.find(emoji => emoji.name === args[0]);
        if (String(emote) !== "undefined") {
            message.channel.send(`${emote}`);
        }
    }
}