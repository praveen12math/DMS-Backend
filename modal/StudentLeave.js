const mongoose = require('mongoose');

const studentLeaveSchema = mongoose.Schema({
   
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
    cordinator:{
        type: String
    },
    description:{
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    remark: {
        type:String
    },

},
{ timestamp: true }
);

module.exports = new mongoose.model("Leave", studentLeaveSchema);