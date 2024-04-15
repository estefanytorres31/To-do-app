import React from "react";
import { Link } from "react-router-dom";
import { Task } from "../models/task";
import { deleteTask } from "../service/TaskService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TaskItemProps {
  task: Task;
  onDeleteTask: (taskId: string) => void;
  isGridView: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask, isGridView }) => {
  const handleDeleteClick = async () => {
    try {
      if (!task.id) {
        console.error("Error: ID de tarea no válido");
        return;
      }
      await deleteTask(task.id.toString());
      onDeleteTask(task.id.toString());
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div className={`bg-white shadow-md p-4 rounded-md ${isGridView ? 'w-full md:w-72' : 'w-full'} flex flex-col ${isGridView ? 'items-center' : 'md:flex-row'} justify-between space-y-4 md:space-y-0 md:space-x-4 border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800`}>
      <div className={`${isGridView ? 'text-center' : 'flex-grow'}`}>
        <h3 className="text-lg font-medium">{task.titulo}</h3>
        <p className="text-gray-700">{task.descripcion}</p>
        <p className="text-gray-700">Límite: {task.fecha_limite}</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <Link
          to={`/edit-task/${task.id}`}
          className={`btn bg-blue-500 text-white rounded-md text-sm px-3 py-1 flex items-center justify-center mb-2 md:mb-0 md:mr-2 md:w-full ${isGridView ? 'rounded-full hover:bg-blue-600' : 'hover:bg-blue-600'}`}
        >
          <EditIcon fontSize="small" />
          {!isGridView && <span className="ml-1">Editar</span>}
        </Link>
        <button
          onClick={handleDeleteClick}
          className={`btn bg-gray-500 text-white rounded-md text-sm px-3 py-1 flex items-center justify-center mb-2 md:mb-0 md:mr-2 md:w-full ${isGridView ? 'rounded-full hover:bg-gray-600' : 'hover:bg-gray-600'}`}
        >
          <DeleteIcon fontSize="small" />
          {!isGridView && <span className="ml-1">Eliminar</span>}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
