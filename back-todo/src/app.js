import express from "express";
import morgan from "morgan";
import cors from "cors";
//Rutas apis
import TaskRouter from "./routes/TaskRoutes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json())

app.use(TaskRouter)


export default app
