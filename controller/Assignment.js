const Assignment = require('../modal/Assignment')



exports.addAssignment = (req, res) => {

    const assignment = new Assignment(req.body)

    assignment.save((err, assignment) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save assignment"
            })
        }
        res.json(assignment)
    })
}

exports.getAllAssignemtById



exports.getAssignmentByStudentId = (req, res, next, id) => {
    Assignment.find({sID:id}).exec((err, assignment) => {
        if(err){
            return res.status(400).json({
                error: "Assignment not found"
            })
        }
        req.assignment = assignment
        next()
    })
}


exports.getAssignmentOfStudent = (req, res) => {
    return res.json(req.assignment)
}


exports.getAssignmnentById = (req, res, next, id) => {
    Assignment.findById(id).exec((err, assignment) => {
        if(err){
            return res.status(400).json({
                error: "Assignment not found"
            })
        }
        req.assignment = assignment
        next()
    })
}


exports.responseAssignment = (req, res) => {
    const assignment = req.assignment

    assignment.updateOne({grade:req.body.grade}).exec((err, assignment) => {
        if(err){
            return res.status(400).json({
                error: "Assignment not found"
            })
        }
        res.json(assignment)
    })
}



exports.getAssignmentByTeacher = (req, res, next, name) => {
    Assignment.find({teacherName: name}).exec((err, assignment) => {
        if(err){
            return res.status(400).json({
                error: "Someting went wrong"
            })
        }
        req.assignment = assignment
        next()
    })
}


exports.getAllAssignmentByTeacher = (req, res) => {
    return res.json(req.assignment)
}