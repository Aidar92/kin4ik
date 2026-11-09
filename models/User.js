const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String, 
    login: String, 
    ban: Boolean, 
    avatar: String,
    password: String
})

module.exports = User