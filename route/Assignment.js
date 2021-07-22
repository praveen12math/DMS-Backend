const express = require("express")
const router = express.Router()

const { addAssignment, 
        getAssignmentOfStudent, 
        getAssignmentByStudentId, 
        responseAssignment, 
        getAssignmnentById, 
        getAllAssignmentByTeacher, 
        getAssignmentByTeacher, 
        removeAssignment
    } = require("../controller/Assignment")
const { isSignedIn, isAuthenticated } = require("../controller/auth")

router.post("/addAssignment", addAssignment)

router.get("/getAssignmentOfStudent/:sID", isSignedIn, isAuthenticated, getAssignmentOfStudent)

router.put("/responseAssignment/:id", isSignedIn, isAuthenticated, responseAssignment)

router.get("/getAssignmentByTeacher/:name", isSignedIn, isAuthenticated, getAllAssignmentByTeacher)

router.delete("/removeAssignment/:id", isSignedIn, isAuthenticated, removeAssignment)

router.param("sID", getAssignmentByStudentId)
router.param("id", getAssignmnentById)
router.param("name", getAssignmentByTeacher)

module.exports = router