const express = require('express');
const router = express.Router();
const { isAuthenticated, isSignedIn } = require("../controller/auth");

const { leave, getAllLeaveById, getResponseLeaveByTeacher, acceptResponseOnLeave, rejectResponseOnLeave, getLeaveById } = require("../controller/leave")

router.post("/studentleave",isSignedIn,leave);

router.get("/getAllNotice/:noticeAllId",isSignedIn)

router.get("/getLeaveByTeacher/:getLeaveByTeacherName", isSignedIn)

router.put("/acceptResponse/:leaveId", isSignedIn, acceptResponseOnLeave)

router.put("/rejectResponse/:leaveId", isSignedIn, rejectResponseOnLeave)







//param
router.param("leaveId", getLeaveById)

router.param("noticeAllId", getAllLeaveById)

router.param("getLeaveByTeacherName", getResponseLeaveByTeacher)

module.exports=router;