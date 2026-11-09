const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const StarSchema = new Schema({
    rus_name: String,
    eng_name: String,    
    carrer: [{
        film: { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
        position: { type: mongoose.Schema.Types.ObjectId, ref: 'Position' }
    }],
    height: Number,
    birthDate: Date,
    birthPlace: String,
    filmsCount: Number,
    films: [{ type: Schema.ObjectId, ref: 'Video' }]
})
const Star = mongoose.model('Star', StarSchema)
// Star.aggregate([
//     {'$addFields': {'films': {'$setUnion': ['$films', []]}}}
// ])
module.exports = Star
