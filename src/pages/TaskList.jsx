import React, { useState, useEffect } from "react";
import TaskTable from "../component/TaskTable";
import TaskSearch from "../component/TaskSearch";
import { getTasks, deleteTask } from "../services/taskService";
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (taskId) => {
    setTaskToDelete(taskId);
    setOpenDialog(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTask(taskToDelete);
      fetchTasks();
      setOpenDialog(false);
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  const handleSearch = (query) => setSearchQuery(query);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <TaskSearch onSearch={handleSearch} />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/task/add")}>
        Add Task
      </Button>

      <TaskTable 
      tasks={filteredTasks} 
      onDelete={confirmDelete} 
      onView={(id) => navigate(`/task/${id}`)} 
      onEdit={(id) => navigate(`/task/edit/${id}`)} 
      loading={loading} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>You want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError("")}>
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskList;