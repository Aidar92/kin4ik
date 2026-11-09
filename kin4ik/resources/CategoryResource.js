const Category = require('../models/Category')

module.exports = {
    resource: Category,
    options: {
      properties: {
        description: {
          type: 'richtext'
        }
      }
    }
}

