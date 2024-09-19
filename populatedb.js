#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.cojoign.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0"'
);

const userArgs = process.argv.slice(2);

const Player = require("./models/players");
const players = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createPlayers();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}


async function playerCreate(index, name) {
    const player = new Player({
        name: name,
        pastPicks: [""],
        score: 0
    });
    await player.save();
    players[index] = player;
    console.log(`Added player: ${name}`);
}


async function createPlayers() {
    console.log("Adding players");
    await Promise.all([
        playerCreate(0, "Matt")
    ]);
  }

