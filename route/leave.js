const express = require('express');
const router = express.Router();
const { isAuthenticated, isSignedIn } = require("../controller/auth");

const { leave, getAllLeaveById } = require("../controller/leave")

router.post("/studentleave",isSignedIn,leave);

router.get("/getAllNotice/:noticeAllId",isSignedIn)

router.param("noticeAllId", getAllLeaveById)

module.exports=router;