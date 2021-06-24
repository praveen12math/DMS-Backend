const Book = require("../modal/Book")



//Add Book
exports.addBook = (req, res) => {
    const book = new Book(req.body)

    book.save((err, book) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save in db"
            })
        }
        return res.json({
            message: "Book added"
        })
    })
}


//Get all books
exports.getBook = (req, res) => {
    Book.find((err, book) => {
        if(err){
            return res.status(400).json({
                error: "Unable to save in db"
            })
        }
        return res.json(book)
    })
}


//delete book
exports.removeBook = (req, res) => {
    const book = req.book
    book.remove((err, book) => {
        if(err){
            return res.status(400).json({
                err: "Unable to delete"
            })
        }
        res.json({
            message: "Delete success",
book
        })
    })
}



exports.getBookById = (req, res, next, id) => {
    Book.findById(id).exec((err, book) => {
        if(err){
            return res.status(400).json({
                error: "Notice not found"
            })
        }
        req.book = book
        next()
    })
}