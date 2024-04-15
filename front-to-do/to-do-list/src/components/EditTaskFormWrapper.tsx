import React from "react";
import { useParams, Navigate } from "react-router-dom";
import EditTaskForm from "./TaskEditForm";

const EditTaskFormWrapper: React.FC = () => {
  const { id } = useParams();

  const handleTaskUpdated = () => {
    console.log("La tarea se ha actualizado correctamente");
  };

  const handleNavigateToList = () => {
    return <Navigate to="/" />;
  };

  return id ? (
    <EditTaskForm
      task={{ id: Number(id), titulo: "", descripcion: "", fecha_limite: "" }}
      onTaskUpdated={handleTaskUpdated}
      onNavigateToList={handleNavigateToList}
    />
  ) : (
    <Navigate to="/" />
  );
};

export default EditTaskFormWrapper;
