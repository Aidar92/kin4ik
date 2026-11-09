const express = require('express'),
    router = express.Router(),
    Star = require('../models/Star')

router.get('/:id', function(req, res) {
    Star.findById(req.params.id, function (err, star) {
        if (err) res.status(500).json({
            "error": err
        })
        res.send(star)
    })
})

module.exports = router