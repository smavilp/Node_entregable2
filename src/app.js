const express = require("express");
const app = express();
app.use(express.json());
const db = require("./utils/database");
const Todo = require("./models/todoModel");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

db.authenticate()
  .then(()=> console.log("Database connected"))
  .catch((error)=>console.error(error));

db.sync()
  .then(()=>console.log("Database synchronized"))
  .catch((error)=>console.error(error));

app.get("/", (req, res) => res.send("Server running"));

app.get("/api/v1/todo", async (req, res) => {
  try{
    const result = await Todo.findAll();
    console.log(req)
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/api/v1/todo/:id", async (req, res) => {
  try{
    const {id} = req.params;
    const result = await Todo.findByPk(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/api/v1/todo", async (req, res) => {
  try{
    const newUser = req.body;
    const result = await Todo.create(newUser);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/api/v1/todo/:id", async (req, res) => {
  try{
    const {id} = req.params;
    const {title, description, completed} = req.body;
    await Users.update(
      {title, description, completed},
      {where: {id}}
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/api/v1/todo/:id", async(req, res) => {
  try{
    const {id} = req.params;
    await Todo.destroy({
      where: {id},
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});
