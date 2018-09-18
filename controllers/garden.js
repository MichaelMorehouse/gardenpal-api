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

    gardenDoc.save(err => {
        if (err) return next(err)
        res.status(200).send()
    })
}

exports.gardenFetchAll = function(req, res, next) {
    const userId = userIdFromToken(req.body.token)
    console.log(userId)
    Garden.find({userId: userId}, err => {
        if (err) return next(err)
    })
    .then(gardens => {
        res.send(gardens)
    })
}

exports.confirmPlantChanges = (req, res, next) => {
    const userId = userIdFromToken(req.body.token)
    const { plantChanges } = req.body
    
    User.findById(userId, (err, user) => {
        if (err) return next(err)
        Garden.findByIdAndUpdate(user.activeGarden, {$push:{plants: plantChanges}}, err => {if (err) next(err)})
        .then(garden => {
            res.send(garden)
            console.log(garden)
        })
        .catch(err=> {if (err) next(err)})
    })
}

exports.fetchGarden = (req,res,next) => {
    const userId = userIdFromToken(req.body.token)
    User.findById(userId, (err, user) => {
        if (err) return next(err)
        Garden.findById(user.activeGarden, err => 
            {if (err) next(err)})
        .then(garden => {
            res.send(garden)
            console.log(garden)
        })
        .catch(err=> {if (err) next(err)})
    })
}