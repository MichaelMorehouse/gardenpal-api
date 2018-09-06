const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', {session: false})

const Garden = require('./controllers/garden')

module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'})
    })
    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup)
    app.post('/gardencreate', Garden.gardenCreate)
    app.post('/gardenlist', Garden.gardenFetchAll)
    app.post('/activategarden', Authentication.activateGarden)
    app.post('/confirmplantchanges', Garden.confirmPlantChanges)
}