const express = require('express'),
    router = express.Router(),
    video = require('../models/Video')

router.get('/', function(req, res) {
    return video.find({}, function(err, videos) {
        if (err) res.status(500).json({
            "error": err
        })
        res.send(videos)
    })
})

router.get('/:id', function(req, res) {
    return video.findById(req.params.id, function(err, video) {
        if (err) res.status(500).json({
            "error": err
        })
        res.send(video)
    })
})

module.exports = router