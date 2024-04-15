import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TaskItem from "./TaskItem";
import { Task } from "../models/task";
import { TaskContext } from "../context/TaskProvider";
import { deleteTask, getTasks } from "../service/TaskService";
import GridViewIcon from '@mui/icons-material/ViewModule';
import ListViewIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';

const TaskList: React.FC = () => {
  const taskContext = useContext(TaskContext);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setActiveTasks(tasks);
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      return response;
    } catch (error) {
      console.error("Error al obtener las tareas:", error);
      return [];
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      const updatedTasks = activeTasks.filter((task) => task.id !== Number(taskId));
      setActiveTasks(updatedTasks);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  const handleTaskUpdated = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      {}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => setIsGridView(false)}
            className={`btn bg-gray-500 text-white px-4 py-2 rounded ${isGridView ? '' : 'shadow'}`}
            style={{ marginRight: "0px", backgroundColor: isGridView ? "" : "#cccccc" }}
            title="Cuadrícula"
          >
            <ListViewIcon style={{ marginRight: "5px" }} />
          </button>
          <button
            onClick={() => setIsGridView(true)}
            className={`btn bg-gray-500 text-white px-4 py-2 rounded ${isGridView ? 'shadow' : ''}`}
            style={{ backgroundColor: isGridView ? "#cccccc" : "" }}
            title="Lista"
          >
            <GridViewIcon style={{ marginRight: "5px" }} />
          </button>
        </div>
        {}
        <Link to="/task-form" className="btn bg-green-500 text-white px-4 py-2 rounded flex items-center">
          <AddIcon style={{ marginRight: "5px" }} />
          Agregar Tarea
        </Link>
      </div>
      {}
      <div className={`${isGridView ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'flex flex-col items-center'}`}>
        {activeTasks.length === 0 ? (
          <p className="text-gray-500 text-center">No hay tareas activas.</p>
        ) : (
          activeTasks.map((task: Task) => (
            <div key={task.id} style={{ marginBottom: isGridView ? '0' : '2rem' }}>
              <TaskItem task={task} onDeleteTask={handleDeleteTask} isGridView={isGridView} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
