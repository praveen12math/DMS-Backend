const Notice = require("../modal/Notice");


//Add notice
exports.notice = (req,res) => {
    const notice = new Notice(req.body)

    notice.save((err,data) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save to Db"
            })
        }

        return res.json({
            message: "Notice is posted"
        })
    })

}


//Get all notice
exports.getNotice = (req,res) => {
    Notice.find((err, notice) => {
        if(err){
            return res.status(400).json({
                error: "No notice found"
            })
        }

         res.json(notice)
    })
}



//delete notice
exports.removeNotice = (req, res) => {
    const notice = req.notice
    notice.remove((err, notice) => {
        if(err){
            return res.status(400).json({
                error: "Unable to delete"
            })
        }
        res.json({
            message: "Delete success",
            notice
        })
    })
}



//get notice by id => middleware
exports.getNoticeById = (req,res, next, id) => {
    Notice.findById(id).exec((err, notice) => {
        if(err){
            return res.status(400).json({
                error: "Notice not found"
            })
        }
        req.notice = notice
        next()
    })
}