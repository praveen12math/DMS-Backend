const AttendanceModule = require("../modal/AttendanceModule")


//Add new attendance Module
exports.addAttendanceModule = (req, res) => {
    const attendance = new AttendanceModule(req.body)

    attendance.save((err, attendance) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save in DB"
            })
        }
        
        var arr = []
        for(let i=attendance.startRollno;i<=attendance.endRollno;i++){
            let roll = {rollno: i, value: 0}
            arr.push(roll)
        }

        if(attendance.lateralStart !=0)
        for(let i=attendance.lateralStart;i<=attendance.lateralEnd;i++){
            let roll = {rollno: i, value: 0}
            arr.push(roll)
        }
        
        attendance.update({attendance: arr}).exec()
        return res.json({
            message: "Attendance module added"
        })

    })
}


//Get attendance module by teacher
exports.getAttendanceModuleBySecondId = (req, res, next, id) => {
    AttendanceModule.find({secondId: id}).exec((err, attendance) => {
        if(err){
            return res.status(400).json({
                error: "Not found"
            })
        }
        req.attendance = attendance       
        next()
    })
}

exports.getAttendanceModule = (req, res) => {
    return res.json(req.attendance)
}



//get attendance module by id
exports.getAttendanceModuleById = (req, res, next, id) => {
    AttendanceModule.findById(id).exec((err, attendance) => {
        if(err){
            return res.status(400).json({
                error: "Not found"
            })
        }
        req.attendanceModule = attendance
        next()
    })
}


//Delete Attendance Module
exports.removeAttendanceModule = (req, res) => {
    const attendance = req.attendanceModule
    attendance.remove((err, attendance) => {
        if(err){
            res.status(400).json({
                error: "Cannot delete"
            })
        }
        res.json({
            message: "Module delete success"
        })
    })
}




//DONE  Add new attendance

exports.addAttendance = (req, res) => {
    const module = req.attendanceModule
    //res.json(module.attendance)
    //module.attendance.map(changeValue)
    let myRoll = req.body.roll
    myRoll.sort()
    let arr = changeValue(module.attendance, myRoll)
    //res.json(arr)
    let newT = module.times
     module.update({attendance:arr, times:newT+1}).exec((err, data) => {
         if(err){
             return res.json(err)
         }
         res.json(data)
     })
    
}

 const changeValue = (attendance, myRoll) => {
    let index = 0
    let myarr = []
     for(let i=0;i<attendance.length;i++){
        if(myRoll[index] === attendance[i].rollno){            
            let data = {rollno:attendance[i].rollno, value:++attendance[i].value}
            myarr.push(data)
            index++
        }
        else{
            let data = {rollno:attendance[i].rollno, value:attendance[i].value}
            myarr.push(data)
        }
     }
     return myarr
 }


 //Get attendance By Rollno
 exports.getAttendanceByRollno = (req, res, next, rollno) => {
     let roll = parseInt(rollno)
    AttendanceModule.find({"attendance.rollno": roll}).exec((err, attendance) => {
        if(err){
            return res.json(err)
        }
        res.json(attendance)
        next()
    })
 }