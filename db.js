const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:7uP7XzQTV1ryT8Dj@cluster0.5godjds.mongodb.net/todoDB"
);
const todoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  Completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
