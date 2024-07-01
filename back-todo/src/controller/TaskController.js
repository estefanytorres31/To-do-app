import * as TaskService from "../service/TaskService.js"

export const CreateTask = async (req, res) => {
    try {
        const { titulo, descripcion, fecha_limite } = req.body;
        const task = await TaskService.CreateTask(titulo, descripcion, fecha_limite);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion, fecha_limite } = req.body;
        const task = await TaskService.editTask(id, titulo, descripcion, fecha_limite);
        if (task) {
            res.status(200).json( task);
        } else {
            res.status(404).json({ success: false, message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const ListTask = async (req, res) => {
    try {
        const tasks = await TaskService.ListTask();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskService.getTaskById(id);
        if (task) {
            res.status(200).json(task);
        } else {
            res.status(404).json({ success: false, message: "Task not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await TaskService.deleteTask(id);
        res.status(200).json({message: "Tarea eliminado"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el cliente.' });
    }
}
