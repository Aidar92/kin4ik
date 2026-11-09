const Notification = require('../models/Notification')

module.exports = {
    resource: Notification,
    options: {
      properties: {
        message: {
          type: 'richtext'
        }
      }
    }
}

