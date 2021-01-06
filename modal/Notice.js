const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    
    title:{
       type: String,
       required: true
    },
    description:{
        type: String
    },
    pic:{
        data: Buffer
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Notice",noticeSchema);