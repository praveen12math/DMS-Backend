const mongoose = require('mongoose');

const leaveSchema = mongoose.Schema({
   
    name:{
        type: String,
        required: true
    },
    rollno: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        required: true 
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }

},
{ timestamp: true }
);

module.exports = new mongoose.model("Leave",leaveSchema);