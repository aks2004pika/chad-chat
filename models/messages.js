const mongoose = require("mongoose")
const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Messages = mongoose.model("message", messageSchema)

module.exports = Messages
