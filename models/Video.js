const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require('mongoose-relationship')
const VideoSchema = new Schema({
    title: String,
    year: Number,
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    type: { type: Schema.Types.ObjectId, ref: 'VideoType' },
    stars: [{
        star: { type: Schema.ObjectId, ref: 'Star' },
        position: { type: Schema.ObjectId, ref: 'Position' }
    }],
    actors: [{ type: Schema.ObjectId, ref: 'Star', childPath: 'films' }],
    duration: String,
    poster: String,
    cover: String,
    description: String,
    rating: Number
})
VideoSchema.plugin(relationship, { relationshipPathName: 'actors' })
const Video = mongoose.model('Video', VideoSchema)

module.exports = Video