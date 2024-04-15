import axios from "axios";
import { Task } from "../models/task";

const apiUrl = "http://localhost:3001/task";

export const getTasks = async () => {
  try {
    const response = await axios.get(apiUrl);
    const responseData = response.data;

    if (Array.isArray(responseData)) {
      return responseData.map((taskData: any) => ({
        id: taskData.id,
        titulo: taskData.titulo,
        descripcion: taskData.descripcion,
        fecha_creacion: taskData.fecha_creacion,
        fecha_limite: taskData.fecha_limite,
        estado: taskData.estado,
      }));
    } else if (typeof responseData === 'object' && responseData !== null) {
      const tasksArray = Object.values(responseData).find(Array.isArray);
      if (tasksArray) {
        return tasksArray.map((taskData: any) => ({
          id: taskData.id,
          titulo: taskData.titulo,
          descripcion: taskData.descripcion,
          fecha_creacion: taskData.fecha_creacion,
          fecha_limite: taskData.fecha_limite,
          estado: taskData.estado,
        }));
      }
    }

    throw new Error("La respuesta de la API no contiene tareas válidas");
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    return [];
  }
};
export const addTask = async (task: Task) => {
  try {
    const { id, fecha_creacion, ...requestData } = task;

    const requestDataWithDefaultState = { ...requestData, estado: true };

    const response = await axios.post(apiUrl, requestDataWithDefaultState);
    return response.data;
  } catch (error) {
    console.error("Error al agregar la tarea:", error);
    throw new Error("Error al agregar la tarea"); 
  }
};
export const editTask = async (id: string, updatedTaskData: Partial<Task>) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, updatedTaskData);
    return response.data;
  } catch (error) {
    console.error("Error al editar la tarea:", error);
    throw new Error("Error al editar la tarea");
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    throw new Error("Error al eliminar la tarea");
  }
};
export const getTaskById = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de la tarea:", error);
    throw new Error("Error al obtener los detalles de la tarea");
  }
};