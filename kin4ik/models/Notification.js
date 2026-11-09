const mongoose = require('mongoose')

const Notification = mongoose.model("Notification", {
    title: String,
    message: String
})

module.exports = Notification