const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/User'),
    express = require('express'),
    router = express.Router()

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ login: username }, function (err, user) {
            if (err) return done(err)
            if (!user) return done(null, false, { message: 'Incorrect username' })
            if (user.password != password) return done(null, false, { message: 'Incorrect password' })
            return done(null, user)
        })
    }
))
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
router.get('/profile', function (req, res) {
    if (req.session.passport)
        User.findById(req.session.passport.user._id, function (err, user) {
            if (err) res.status(500).json({
                "error": err
            })
            res.send({
                name: user.name,
                login: user.login,
                avatar: user.avatar
            });
        })
    else res.status(401).json({"status": "You are not authorized"})
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}))

router.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = router