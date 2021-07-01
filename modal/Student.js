const mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: 3,
        required: true
        },

    email: {
        type: String,
        required: true
    },

    rollno: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    batch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    } 

},
 {timestamps: true}
);

module.exports = mongoose.model("Student",studentSchema);