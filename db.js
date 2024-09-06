const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:7uP7XzQTV1ryT8Dj@cluster0.5godjds.mongodb.net/todoDB"
);
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, requierd: true },
  completed: { type: Boolean },
});

const todo = mongoose.model("todos", todoSchema);

module.exports = {
  todo,
};
