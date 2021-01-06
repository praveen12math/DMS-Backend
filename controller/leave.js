const Leave = require("../modal/Leave");


exports.leave = (req,res) => {
    
   const {name,rollno,subject,description} = req.body;

   if(!name || !rollno || !subject || !description){
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