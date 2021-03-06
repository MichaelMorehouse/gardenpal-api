const jwt = require('jwt-simple')
const User = require('../models/user')
const Garden = require('../models/garden')

function tokenForUser(user) {
    const timestamp = new Date().getTime()
    return jwt.encode({sub: user.id, iat: timestamp}, process.env.SECRET)
}

function userIdFromToken(token) {
    return jwt.decode(token, process.env.SECRET).sub
}

exports.signin = function(req, res, next) { 
    // User has already has username/password auth'd
    // We just need to give them a token
    res.send({ token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.status(422).send({error: "You must provide email and password"})
    }

    // See if a user with the given email exist
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) {return next(err)}

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({error: 'Email is in use'})
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password,
            activeGarden: null
        })

        user.save(function(err) {
            if (err) next(err)
            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) })
        })
    })
}

exports.activateGarden = function(req, res, next) {
    const userId = userIdFromToken(req.body.token)
    console.log("userId: " + userId)
    const gardenId = req.body.gardenId
    console.log("gardenId: " + gardenId)
    // Update user document with active garden ObjectId
    User.findByIdAndUpdate(userId, { activeGarden: gardenId }, function(err, user) {
        if (err) next(err)
        // then find the corresponding garden and return it
        Garden.findById(user.activeGarden, function(err, garden) {
            if (err) next(err)
            console.log(garden)
            res.send(garden)
        })
    })
}