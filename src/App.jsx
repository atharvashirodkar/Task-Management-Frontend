import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskDetails from "./pages/TaskDetails";
import Header from "./component/Header";
import AddUpdateTask from "./component/AddUpdateTask";
import { Typography } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path="/task/add" element={<AddUpdateTask />} />
        <Route path="/task/edit/:taskId" element={<AddUpdateTask />} />
        <Route path="*" element={<Typography variant="h4">404 - Page Not Found</Typography>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;