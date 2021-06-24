const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    bookLink: {
        type: String,
        required: true
    },
    publication: {
        type: String
    }
},
{timestamps: true})

module.exports = mongoose.model("Book", bookSchema)