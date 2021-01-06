const express = require('express');
const router = express.Router();
const { isAuthenticated, isSignedIn } = require("../controller/auth");

const { leave } = require("../controller/leave")

router.post("/leave",isAuthenticated,leave);

module.exports=router;