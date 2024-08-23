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
  } // mongododb link : mongodb+srv://admin:7uP7XzQTV1ryT8Dj@cluster0.5godjds.mongodb.net/todoDB

  //!now put it in mongodb
  await todo
    .create({
      title: createPayload.title,
      description: createPayload.description,
    })
    .then(res.json({ msg: "Todo created" }));
});

app.get("/todos", (req, res) => {});

app.put("/completed", (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload) {
    res.status(411).json({
      msg: "your input type is invaild for update",
    });
    return;
  }
});

app.listen(3000);
