import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TaskProvider } from "./context/TaskProvider";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTaskFormWrapper from "./components/EditTaskFormWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";

const App: React.FC = () => {
  return (
    <Router>
      <TaskProvider>
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">To Do List</h1>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <TaskList />
                </div>
              }
            />
          </Routes>
          <Routes>
            <Route path="/task-form" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<EditTaskFormWrapper />} />
          </Routes>
        </div>
      </TaskProvider>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Router>
  );
};

export default App;
