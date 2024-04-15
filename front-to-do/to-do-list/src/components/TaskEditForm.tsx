import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Task } from "../models/task";
import { editTask, getTaskById } from "../service/TaskService";
import { TextField, Button, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface EditTaskFormProps {
    task: Task;
    onTaskUpdated: () => void;
    onNavigateToList: () => void; 
  }
const EditTaskForm: React.FC<EditTaskFormProps> = ({ task: initialTask, onTaskUpdated, onNavigateToList }) => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [titulo, setTitulo] = useState<string>(initialTask.titulo || "");
  const [descripcion, setDescripcion] = useState<string>(initialTask.descripcion || "");
  const [fechaCompleta, setFechaCompleta] = useState<string>(initialTask.fecha_limite || "");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const fetchedTask = await getTaskById(id);
          setTask(fetchedTask);
          setTitulo(fetchedTask.titulo);
          setDescripcion(fetchedTask.descripcion);
          setFechaCompleta(fetchedTask.fecha_limite);
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la tarea:", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleTituloChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitulo(event.target.value);
  };

  const handleDescripcionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(event.target.value);
  };

  const handleFechaCompletaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFechaCompleta(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!task?.id || isNaN(task.id)) {
        throw new Error("Error: ID de tarea no válido");
      }
      const updatedTaskData = {
        ...task,
        titulo,
        descripcion,
        fecha_limite: fechaCompleta,
      };
      await editTask(task.id.toString(), updatedTaskData);
      toast.success("Registro editado exitosamente", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onTaskUpdated(); 
      onNavigateToList();
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            value={titulo}
            onChange={handleTituloChange}
            required
            className="mb-4"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción"
            value={descripcion}
            onChange={handleDescripcionChange}
            required
            className="mb-4"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha Límite (dd-mm-yyyy hh:mm:ss)"
            value={fechaCompleta}
            onChange={handleFechaCompletaChange}
            required
            className="mb-4"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" className="w-full">
            Guardar cambios
          </Button>
        </Grid>
      </Grid>
      <ToastContainer />
    </form>
  );
};

export default EditTaskForm;
