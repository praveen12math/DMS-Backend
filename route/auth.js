const { json } = require('body-parser');
var express= require('express'); 
var router= express.Router(); 
const { check } = require('express-validator');
const { signupStudent,
        signinStudent,
        signout,
        isSignedIn,
        getAllTeacherName,
        requestPasswordRecovery,
        resetPassword,
        getUserByresetCode,
        isAuthenticated,
        addTeacher,
        updateTeacherDetails,
        getTeacherById,
        getAllTeacher,
        getAllStudent,
        deleteUser,    
    } = require("../controller/auth");

const { notice, 
        getNotice, 
        removeNotice, 
        getNoticeById 
    } = require('../controller/notice');


router.post("/signupStudent", [
    check("name","name should be alteast 3 char long").isLength({min: 3}), 
    check("email","invalid email").isEmail(),
    check("password","not correct according to format").isLength({min:3})
],signupStudent);

router.post("/signinStudent", [
    check("email","invalid email").isEmail(),
    check("password","not correct according to format").isLength({min:3})
],signinStudent);


router.post("/addTeacher", isSignedIn, isAuthenticated, addTeacher)

router.post("/resetPassword", requestPasswordRecovery)

router.post("/resetPassword/:resetCode", resetPassword)


router.get("/getAllTeacherName", getAllTeacherName)

router.get("/getAllTeacher", isSignedIn, isAuthenticated, getAllTeacher)

router.get("/getAllStudent", isSignedIn, isAuthenticated, getAllStudent)

router.post("/postNotice",isSignedIn,notice)


router.get("/getNotice",isSignedIn,getNotice);

router.delete("/notice/:noticeId", removeNotice)

router.delete("/removeUser/:teacherId", isSignedIn, isAuthenticated, deleteUser)

router.get("/signout" , signout); 

router.put("/editTeacher/:teacherId", isSignedIn, isAuthenticated, updateTeacherDetails)

router.param("teacherId", getTeacherById)

router.param("noticeId", getNoticeById)

router.param("resetCode", getUserByresetCode)

router.get("/protected",isSignedIn,(req,res) =>{
  return res.json({
      "message": "I am a protected Route"
  })
})

module.exports = router;