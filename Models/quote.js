const mongoose = require('mongoose')

const quoteSchema = mongoose.Schema({
    userId:{type: String, required: true},
    about:{type: String, required: true},
    description:{type: String, required: true},
    by:{type: String, required: true},
    imageUrl:{type: String}
});

module.exports = mongoose.model('Quote',quoteSchema);