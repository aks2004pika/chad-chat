const express = require("express")
const Messages = require("../models/messages")

const router = express.Router()

router.get("/api/messages", (req, res) => {
  Messages.find().then(messageDocuments => {
    res.send(messageDocuments)
  })
})

module.exports = router
