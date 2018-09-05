const mongoose = require('mongoose')
const Schema = mongoose.Schema

const plantSchema = new Schema({
    gardenId: String,
    type: String,
    variety: String,
    datePlanted: Date,
    plantX: Number,
    plantY: Number,
    plantFullRadius: Number,
    plantingSpacing: Number,
    daysToHarvest: Number,
})

module.exports = mongoose.model('Plant', plantSchema);