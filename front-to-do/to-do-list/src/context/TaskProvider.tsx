import React, { createContext, useState, useEffect, FC } from "react";
import { getTasks, addTask } from "../service/TaskService";
import { Task } from "../models/task";

type Props = {
  children: React.ReactNode;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => Promise<void>;
};

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: async () => {},
});

export const TaskProvider: FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  const addTaskHandler = async (task: Task) => {
    const newTask = await addTask(task);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask: addTaskHandler }}>
      {children}
    </TaskContext.Provider>
  );
};
