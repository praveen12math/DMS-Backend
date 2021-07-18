const mongoose = require("mongoose")

const assignmentSchema = mongoose.Schema({

    fileUrl: {
        type: String,
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        default: "Not Graded"
    },
    sID : {
        type: String,
        required: true
    }

},{timestamps: true})

module.exports = mongoose.model("Assignment", assignmentSchema)