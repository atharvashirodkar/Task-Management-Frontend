import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTask, getTaskById, updateTask } from "../services/taskService";
import { TextField, Button, Container, Typography, CircularProgress, Snackbar, Alert, Autocomplete, Paper, Box } from "@mui/material";
import Grid from '@mui/material/Grid2'


const AddUpdateTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({ title: "", description: "", status: "Pending" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fixed status options
  const statusOptions = ["Pending", "In Progress", "Completed"];

  // Fetch Task Data when Editing
  useEffect(() => {
    if (taskId) {
      const fetchTask = async () => {
        setLoading(true);
        try {
          const task = await getTaskById(taskId);
          if (task && task.success) setTaskData(task.data);
        } catch (err) {
          setError("Failed to fetch task details.");
        } finally {
          setLoading(false);
        }
      };
      fetchTask();
    }
  }, [taskId]);

  // Handle input changes
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // Handle status change
  const handleStatusChange = (event, value) => {
    setTaskData({ ...taskData, status: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title.trim() || !taskData.description.trim()) {
      setError("Title and Description are required!");
      return;
    }

    setLoading(true);
    try {
      if (taskId){
         await updateTask(taskId, taskData);
      }
      else {
        await createTask(taskData);
      }
      navigate("/");
    } catch (err) {
      setError("Failed to save task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {taskId ? 'Update Task' : 'Add Task'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid spacing={3}>
            <Grid>
              <TextField
                label="Title"
                name="title"
                fullWidth
                required
                value={taskData.title}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <TextField
                label="Description"
                name="description"
                fullWidth
                required
                multiline
                rows={4}
                value={taskData.description}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid>
              <Autocomplete
                options={statusOptions}
                value={taskData.status}
                onChange={handleStatusChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    fullWidth
                    required
                    margin="normal"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  sx={{ mr: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : taskId ? 'Update Task' : 'Create Task'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddUpdateTask;