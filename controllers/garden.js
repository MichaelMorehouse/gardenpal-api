const Garden = require('../models/garden')
const Plant = require('../models/plant')

exports.gardenCreate = function(req, res, next) {
    const newGarden = {...req.body}
    console.log(newGarden)

    var gardenDoc = new Garden({
        name: newGarden.name,
        location: newGarden.location,
        dateCreated: new Date(),
        gardenX: newGarden.gardenX,
        gardenY: newGarden.gardenY,
        plants: []
    })

    gardenDoc.save(err => {
        if (err) return next(err)

        console.log('success')
    })
}

exports.gardenFetchAll = function(req, res, next) {
    Garden.find({location: 'Vancouver WA'}, err => {
        if (err) return next(err)
    })
    .then(result => res.send(result))
}