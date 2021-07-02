const mongoose = require('mongoose')

const paperSchema = mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    paperLink: {
        type: String,
        required: true
    },
    paperCode: {
        type: String
    }
},
{timestamps: true})

module.exports = mongoose.model("Paper", paperSchema)