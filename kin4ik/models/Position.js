const mongoose = require('mongoose')

const Position = mongoose.model('Position', {
    name: String
})

module.exports = Position