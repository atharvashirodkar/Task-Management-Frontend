import React, { useState, useEffect } from "react";
import TaskTable from "../component/TaskTable";
import TaskSearch from "../component/TaskSearch";
import { getTasks, deleteTask } from "../services/taskService";
import { Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 const [totalTasks, setTotalTasks] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    limit: 5,
  });

  const [filters, setFilters] = useState({
    title: "",
    status: "",
    from: "",
    to: "",
    q: "",
  });

  useEffect(() => {
    fetchTasks();
  }, [paginationModel, filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { page, limit } = paginationModel;
      const data = await getTasks({
        page: page + 1, 
        limit
      });
      setTasks(data.data);
      setTotalTasks(data.pagination.totalTasks);      
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

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, q: query }));
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPaginationModel((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (event, newPage) => {
    setPaginationModel((prev) => ({ ...prev, page: newPage }));
  };

  const handleLimitChange = (event) => {
    setPaginationModel((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  return (
    <Container>
      <TaskSearch
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/task/add")}>
        Add Task
      </Button>

      <TaskTable
        tasks={tasks}
        onDelete={confirmDelete}
        onView={(id) => navigate(`/task/${id}`)}
        onEdit={(id) => navigate(`/task/edit/${id}`)}
        loading={loading}
        totalTasks={totalTasks}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />

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
    </Container>
  );
};

export default TaskList;