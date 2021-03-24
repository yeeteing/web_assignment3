const express = require('express')
const book_router  = express.Router()

const book_controller = require("../controllers/books.js")

book_router.post("/", book_controller.create)
book_router.get("/", book_controller.all)
book_router.get("/:id", book_controller.getOne)
book_router.put('/:id', book_controller.updateOne)
book_router.delete('/:id', book_controller.deleteOne)

module.exports = book_router
