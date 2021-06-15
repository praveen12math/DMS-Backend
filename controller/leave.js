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
    Leave.find({userId: id}).exec((err, leave) => {
        if(err){
            return res.status(400).json({
                error: "Something went wrong"
            })
        }
        res.json(leave)
        next()
    })
}