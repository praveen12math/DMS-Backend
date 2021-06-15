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
    userId: {
        type: String,
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
        type: String,
        default: "Pending"
    },
    remark: {
        type:String
    },

},
{ timestamps: true }
);

module.exports = new mongoose.model("Leave", studentLeaveSchema);