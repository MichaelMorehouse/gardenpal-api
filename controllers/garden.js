const Garden = require('../models/garden')
const User = require('../models/user')
const jwt = require('jwt-simple')

function userIdFromToken(token) {
    return jwt.decode(token, process.env.SECRET).sub
}

exports.gardenCreate = function(req, res, next) {
    const newGarden = {...req.body}
    console.log(newGarden)
    const userId = userIdFromToken(req.body.token)

    var gardenDoc = new Garden({
        userId: userId,
        name: newGarden.name,
        location: newGarden.location,
        dateCreated: new Date(),
        gardenX: newGarden.gardenX,
        gardenY: newGarden.gardenY,
        plants: []
    })

    gardenDoc.save(function(err) {
        if (err) next(err)
        res.status(200).send()
    })
}

exports.gardenFetchAll = function(req, res, next) {
    const userId = userIdFromToken(req.body.token)
    console.log(userId)
    Garden.find({ userId: userId }, function(err, gardens) {
        if (err) next(err)
        res.send(gardens)
    })
}

exports.confirmPlantChanges = function(req, res, next) {
    const userId = userIdFromToken(req.body.token)
    const {plantChanges} = req.body
    
    User.findById(userId, function(err, user) {
        if (err) return next(err)
        Garden.findByIdAndUpdate(user.activeGarden, {$push: {plants: plantChanges}}, function(err) {
            if (err) next(err)
            res.status(200).send()
        })
    })
}

exports.fetchGarden = (req,res,next) => {
    const userId = userIdFromToken(req.body.token)
    User.findById(userId, function(err, user) {
        if (err) next(err)
        Garden.findById(user.activeGarden, function(err) {
            if (err) next(err)
            res.send(garden)
        })
    })
}