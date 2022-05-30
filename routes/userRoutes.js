const express = require("express")
const Users = require("../models/users")

const router = express.Router()

router.post("/api/users/new", (req, res) => {
  const user = Users(req.body)

  user
    .save()
    .then(userDocument => {
      res.send(userDocument)
    })
    .catch(err => {
      console.log(err)
    })
})

router.post("/api/users/login", (req, res) => {
  Users.findOne(
    {
      username: req.body.username,
      password: req.body.password,
    },
    (err, userDocument) => {
      if (err) {
        console.log(err)
      }
      if (userDocument) res.send(userDocument)
      else res.send(false)
    }
  )
})

module.exports = router
