const mongoose = require('mongoose')

const VideoType = mongoose.model('VideoType', {
    name: String
})

module.exports = VideoType