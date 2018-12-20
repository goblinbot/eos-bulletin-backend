# Eos-bulletin (BackEnd)

Backend for the websocket / discord based bulletin board experiment. Built in Node.JS.

## What?

It's a spy. Sort of. It's not a very good spy.

Using the package Discord.js and a config.json, the Eos-bulletin-backend can create a Discord bot, which can listen in on a specific channel and record the messages, memorizing an adjustable amount of messages in a JSON Array.

HTTP GET Requesting to this 'API' provides the message JSON Array, and when a new message is recorded, the websocket will emit an update + the new list of messages.

### Cool, how do I use this?
First you'll need to create your own Config.json and a Discord bot on the Discord developer portal, since you'll be needing a Token for the Config.

(WIP more instructions)

A premade solution to use the list of messages built in Angular can be found [here](https://github.com/goblinbot/eos-bulletin-frontend)

### TODO
Add 'Day', 'Time' and other information that could be used to the Messages JSON.
