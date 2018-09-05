const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gardenSchema = new Schema({
    dateCreated: Date,
    name: String,
    location: String,
    gardenX: Number,
    gardenY: Number,
    plants: Array
})

module.exports = mongoose.model('Garden', gardenSchema);