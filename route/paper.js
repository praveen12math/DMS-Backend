const express = require('express');
const router = express.Router();
const { addPaper, getPaper, removePaper, getPaperById } = require('../controller/paper');


router.post("/addPaper", addPaper)
router.get("/getAllPaper", getPaper)

router.delete("/removePaper/:paperId", removePaper)


router.param("paperId", getPaperById)

module.exports=router