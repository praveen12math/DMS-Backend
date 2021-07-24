const { json } = require('body-parser');
var express= require('express'); 
var router= express.Router(); 
const { check } = require('express-validator');
const { signupStudent,
        signinStudent,
        signupTeacher,
        signinTeacher,
        signout,
        isSignedIn,
        getAllTeacherName,
        requestPasswordRecovery,
        resetPassword,
        getUserByresetCode,    
    } = require("../controller/auth");
const { notice, getNotice, removeNotice, getNoticeById } = require('../controller/notice');


router.post("/signupStudent", [
    check("name","name should be alteast 3 char long").isLength({min: 3}), 
    check("email","invalid email").isEmail(),
    check("password","not correct according to format").isLength({min:3})
],signupStudent);

router.post("/signinStudent", [
    check("email","invalid email").isEmail(),
    check("password","not correct according to format").isLength({min:3})
],signinStudent);

router.post("/signupTeacher", [
    check("name","name should be alteast 3 char long").isLength({min: 3}), 
    check("email","invalid email").isEmail(),
    check("password","not correct according to format").isLength({min:3})
],signupTeacher);

router.post("/signinTeacher", [
    check("email","invalid email").isEmail(),
    check("password","not correct according to format").isLength({min:3})
],signinTeacher);


router.post("/resetPassword", requestPasswordRecovery)

router.post("/resetPassword/:resetCode", resetPassword)


router.get("/getAllTeacherName", getAllTeacherName)

router.post("/postNotice",isSignedIn,notice)


router.get("/getNotice",isSignedIn,getNotice);

router.delete("/notice/:noticeId", removeNotice)

router.get("/signout" , signout); 

router.param("noticeId", getNoticeById)

router.param("resetCode", getUserByresetCode)

router.get("/protected",isSignedIn,(req,res) =>{
  return res.json({
      "message": "I am a protected Route"
  })
})

module.exports = router;