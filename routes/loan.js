const express = require('express')
const loan_router  = express.Router()

const loan_controller = require("../controllers/loans.js")

loan_router.post("/", loan_controller.create)
loan_router.get("/", loan_controller.all)
loan_router.get("/open", loan_controller.getOpenLoans)
loan_router.get("/closed", loan_controller.getClosedLoans)
loan_router.get("/:id", loan_controller.getOne)
loan_router.put('/:id', loan_controller.updateOne)
loan_router.delete('/:id', loan_controller.deleteOne)

module.exports = loan_router
