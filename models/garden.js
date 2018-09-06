const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Plant = require('./plant').schema
const PlantSchema = Plant.schema

const gardenSchema = new Schema({
    userId: Schema.Types.ObjectId,
    dateCreated: Date,
    name: String,
    location: String,
    gardenX: Number,
    gardenY: Number,
    plants: Array
})

module.exports = mongoose.model('Garden', gardenSchema);