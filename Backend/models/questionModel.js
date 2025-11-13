// questionModel.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "realUser",  
    required: true
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  model: { type: String, default: "none" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questionSchema);
