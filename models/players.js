const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: String,
    pastPicks: [String],
    score: Number
})

