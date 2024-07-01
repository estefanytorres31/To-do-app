import { Router } from "express";
import { CreateTask,editTask,ListTask,getTaskById,DeleteTask } from "../controller/TaskController.js";

const TaskRouter= Router();

TaskRouter.post("/task",CreateTask);
TaskRouter.put("/task/:id",editTask);
TaskRouter.get("/task",ListTask);
TaskRouter.get("/task/:id",getTaskById);
TaskRouter.delete("/task/:id",DeleteTask);

export default TaskRouter;