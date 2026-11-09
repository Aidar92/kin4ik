const Star = require('../models/Star')

module.exports = {
    resource: Star,
    options: {
      properties: {
        birthDate: {
          type: 'date'
        }
      }
    }
}

