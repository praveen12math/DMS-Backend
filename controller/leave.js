const Leave = require("../modal/StudentLeave")


exports.leave = (req,res) => {
    
   const {name,rollno,subject,cordinator,description} = req.body;

   if(!name || !rollno || !cordinator || !subject || !description){
       return res.json({
           "message": "All field are required"
       })
   }

    const newLeave = new Leave(req.body);
    newLeave.save((err,data) => {
        if(err){
            return res.json({
                "message": "Unable to save in DB."
            })
        }
        else {
            return res.json({
                "message": "Application accepted."
            })
        }
    })
}



exports.getAllLeaveById = (req, res, next, id) => {
    Leave.find({userId: id}).sort({updatedAt:-1}).exec((err, leave) => {
        if(err){
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
        res.json(leave)
        next()
    })
}



exports.getResponseLeaveByTeacher = (req, res, next, name) => {
    Leave.find({cordinator: name}).exec((err, leave) => {
        if(err){
            return res.status(400).json({
                error: "Someting went wrong"
            })
        }
        res.json(leave)
        next()
    })
}



exports.getLeaveById = (req, res, next, id) => {
    Leave.findById(id).exec((err, leave) => {
        if(err){
            return res.status(400).json({
                message: "Leave not found"
            })
        }
        req.leave = leave
        next()
    })
}



exports.acceptResponseOnLeave = (req, res) => {
    const leave = req.leave
    leave.update({status: "Accept"}).exec((err, leave) => {
        if(err){
            return res.status(400).json({
                message: "Cannot update"
            })
        }
        res.json(leave)
    })
}

exports.rejectResponseOnLeave = (req, res) => {
    const leave = req.leave
    leave.update({status: "Reject"}).exec((err, leave) => {
        if(err){
            return res.status(400).json({
                message: "Cannot update"
            })
        }
        res.json(leave)
    })
}