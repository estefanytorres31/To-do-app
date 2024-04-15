import React, { useState } from "react";
import { Task } from "../models/task";
import { useContext } from "react";
import { TaskContext } from "../context/TaskProvider";
import { TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm: React.FC = () => {
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [fechaLimite, setFechaLimite] = useState<string>("");

  const { addTask } = useContext(TaskContext);

  const handleAddTask = async () => {
    try {
      const formattedFechaLimite = new Date(fechaLimite).toISOString();

      const newTask: Task = {
        titulo,
        descripcion,
        fecha_limite: formattedFechaLimite,
      };

      await addTask(newTask);

      toast.success("Tarea agregada exitosamente", {
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTitulo("");
      setDescripcion("");
      setFechaLimite("");
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
      <TextField
        autoFocus
        margin="dense"
        id="titulo"
        label="Titulo"
        type="text"
        fullWidth
        value={titulo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
        className="mb-4"
      />
      <TextField
        margin="dense"
        id="descripcion"
        label="Descripcion"
        type="text"
        fullWidth
        value={descripcion}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescripcion(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4">
        <label htmlFor="fecha_limite" className="block text-sm font-medium text-gray-700">Fecha Limite</label>
        <TextField
          margin="dense"
          id="fecha_limite"
          type="datetime-local" 
          fullWidth
          value={fechaLimite}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFechaLimite(e.target.value)}
        />
      </div>
      
      <Button type="submit" onClick={handleAddTask} variant="contained" color="primary" className="w-full">
        Agregar Tarea
      </Button>
    </form>
  );
};

export default TaskForm;
