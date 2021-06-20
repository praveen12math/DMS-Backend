const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    
    title:{
       type: String,
       required: true
    },
    description:{
        type: String
    },
    imageLink:{
        type: String
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("Notice",noticeSchema);