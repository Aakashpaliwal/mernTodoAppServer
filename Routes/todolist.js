import express from "express";
import { addTodoItem, deleteTodoItem, getAllTodoItems, updateTodoItem } from "../Controllers/todo.js";

const router = express.Router();

router.post("/addtodo", addTodoItem);
router.get("/viewalltodoitem", getAllTodoItems);
router.delete("/deleteTodoItem/:id", deleteTodoItem);
router.put("/edittodo", updateTodoItem);

export default router;