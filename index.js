const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ip = require('ip');
const cors = require('cors');
const port = process.env.PORT || 5009;

/* express extra setup */
app.use(cors());

/* load the config */
const config = require('./config/config.json');

/* Set the Discord listener */
const Discord = require('discord.js');
const client = new Discord.Client();

const messageLimit = 7;
let messageContainer = [];


client.once('ready', () => {
    console.log('Bulletin-listener bot online');
});

if (config) {
    client.login(config.token);
} else {
    console.error('!! config missing');
}

http.listen(port, function(){
    console.log('Eos-bulletin Backend running:');
    console.log(ip.address() + ':' + port);
});

// pathing for the REST API. returns the list of current messages.
app.get('/', function (req, res) {
    res.send(messageContainer);
});

// Trigger on a discord message.
client.on('message', message => {
    // first, validate if it's in the right channel. Secondly, filter out some nasty user input.
    if (validateChannelName(message)) {
        let input = filterUserInput(message.content);
        addToContainer(input);
    }
});

// Huizing/Silvester filter lives again! WIP.
function filterUserInput(input) {
    // do something; remove HTML, script tags, and other nasties.
    let output = input;
    return output;
}

// addToContainer
function addToContainer(message) {
    if(message && message !== '') {
        messageContainer.push({
            "time": "00:00",
            "day": "wip",
            "message": message
        });
        dumpOldMessages();
        sendWebsocketUpdate();
    }
}

// filter messages not coming through the right channel.
function validateChannelName(message) {
    return (message.channel.name === config.channelname);
}

// Cleanup
function dumpOldMessages() {
    if (messageContainer.length > messageLimit) {
        messageContainer.shift();
    }
}

// send the message container over a websocket when updated.
function sendWebsocketUpdate() {
    io.emit('updateMessages', messageContainer);
}
