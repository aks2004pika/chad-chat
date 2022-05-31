const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const socketIO = require("socket.io")
const userRouter = require("./routes/userRoutes")
const messageRouter = require("./routes/messageRoutes")
const Messages = require("./models/messages")

const PORT = process.env || 8080
const dataBaseURL = `mongodb+srv://akshat21:aku1985pika@cluster0.ew0oz.mongodb.net/?retryWrites=true&w=majority`

const app = express()

mongoose.connect(dataBaseURL, { useNewUrlParser: true }).then(() => {
  const server = listenToRequests()
  socketIOConnect(server)
})

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.use(userRouter)
app.use(messageRouter)

app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

const listenToRequests = () => {
  return app.listen(PORT, () => {
    console.log("Listening to requests!")
  })
}

const socketIOConnect = server => {
  const io = socketIO(server, {
    cors: {
      origins: ["*"],
    },
  })

  io.on("connection", socket => {
    console.log(socket.id)

    socket.on("send", data => {
      const message = Messages(data)
      message.save()
      io.emit("recieve", data)
    })
  })
}
