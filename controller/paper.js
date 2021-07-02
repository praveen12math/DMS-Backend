const Paper = require("../modal/Paper")



//Add Paper
exports.addPaper = (req, res) => {
    const paper = new Paper(req.body)

    paper.save((err, paper) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save in db"
            })
        }
        return res.json({
            message: "Paper added"
        })
    })
}


//Get all papers
exports.getPaper = (req, res) => {
    Paper.find((err, paper) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save in db"
            })
        }
        return res.json(paper)
    })
}


//delete paper
exports.removePaper = (req, res) => {
    const paper = req.paper
    paper.remove((err, paper) => {
        if(err){
            return res.status(400).json({
                err: "Unable to delete"
            })
        }
        res.json({
            message: "Delete success",
            paper
        })
    })
}



exports.getPaperById = (req, res, next, id) => {
    Paper.findById(id).exec((err, paper) => {
        if(err){
            return res.status(400).json({
                error: "Notice not found"
            })
        }
        req.paper = paper
        next()
    })
}