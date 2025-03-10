import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskDetails from "./pages/TaskDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddUpdateTask from "./component/AddUpdateTask";
import { Typography } from "@mui/material";
import Header from "./component/Header";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/" element={<TaskList />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path="/task/add" element={<AddUpdateTask />} />
        <Route path="/task/edit/:taskId" element={<AddUpdateTask />} />

        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
