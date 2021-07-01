const mongoose = require("mongoose")

const attendanceModuleSchema = mongoose.Schema({
    subject:{
        type: String,
        required: true
    },
    startRollno:{
        type: Number,
        required: true
    },
    endRollno:{
        type: Number,
        required: true
    },
    lateralStart:{
        type: Number,
        default: 0
    },
    lateralEnd:{
        type: Number,
        default: 0
    },
    secondId:{
        type: String,
        required: true
    },
    attendance:{
        type: Object,
        default: 0
    },
    times:{
        type: Number,
        default: 0
    }
},{timestamps: true})

module.exports = mongoose.model("AttendanceModule", attendanceModuleSchema)