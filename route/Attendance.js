const express = require("express")
const router = express.Router()
const { addAttendanceModule, getAttendanceModuleById, getAttendanceModuleBySecondId, removeAttendanceModule, addAttendance, getAttendanceByRollno } = require("../controller/Attendance")
const { isSignedIn } = require("../controller/auth")

router.post("/addAttendanceModule", addAttendanceModule)
router.get("/attendanceModule/:secondId", isSignedIn)
router.post("/addAttendance/:moduleId", addAttendance)

router.delete("/removeModule/:moduleId", removeAttendanceModule)

router.get("/getAttendanceStudent/:rollno", isSignedIn)


router.param("secondId", getAttendanceModuleBySecondId)
router.param("moduleId", getAttendanceModuleById)
router.param("rollno", getAttendanceByRollno)


module.exports=router