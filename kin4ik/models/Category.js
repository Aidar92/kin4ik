const mongoose = require('mongoose')

const Category = mongoose.model('Category', {
    name: String,
    description: String
})

module.exports = Category