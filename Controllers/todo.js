import Todolist from "../Models/TodolistModel.js";
import User from "../Models/UserModel.js";

export const getAllTodoItems = async (req, res) => {
  const { id } = req.params;
  try {
    const userData = await User.findById(id);
    const allItems = await Todolist.find({ createdBy: id });
    res.status(200).json({ allItems });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addTodoItem = async (req, res) => {
  console.log(req.body);
  const { task, id } = req.body;

  const newTodoItem = new Todolist({
    title: task,
    createdBy: id,
  });
  try {
    await newTodoItem.save();
    res.status(200).json(newTodoItem);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteTodoItem = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Todolist.findByIdAndDelete(id);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateTodoItem = async (req, res) => {
  console.log(req.body);
  const { id, title } = req.body;

  try {
    const result = await Todolist.findByIdAndUpdate(
      id,
      {
        title: title,
      },
      {
        new: true,
      }
    );
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
