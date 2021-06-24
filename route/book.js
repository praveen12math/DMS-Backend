const express = require('express');
const router = express.Router();
const { addBook, getBook, removeBook, getBookById } = require('../controller/book');


router.post("/addBook", addBook)
router.get("/getAllBook", getBook)

router.delete("/removeBook/:bookId", removeBook)


router.param("bookId", getBookById)

module.exports=router