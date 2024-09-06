const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const app = express();
app.use(express.json());

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedTodo = createTodo.safeParse(createPayload);
  if (!parsedTodo.success) {
    res.status(411).json({
      msg: "you have not a given a valid input",
    });
    return;
  }
  //!now put it in mongodb
  await todo
    .create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    })
    .then(res.json({ msg: "Todo created" }));
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({
      msg: "your input type is invaild for update",
    });
    return;
  }
  await todo.updateOne({ _id: req.body.id }, { completed: true });
  res.json({
    msg: "Todo is marked as completed",
  });
});

app.listen(3000);
