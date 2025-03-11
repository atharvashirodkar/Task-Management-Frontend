import React, { useEffect, useState } from "react";
import { getTaskById } from "../services/taskService";
import { Container, Typography, Paper, CircularProgress, Box, Chip } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";
import Grid from '@mui/material/Grid2';

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const data = await getTaskById(taskId);
        if (data && data.success) setTask(data.data);
        else setError("Task not found.");
      } catch (err) {
        setError("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [taskId]);

  if (loading) return <CircularProgress sx={{ mt: 2 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto'}}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 6, width: '60%', maxWidth: 'auto' }}>
        <Grid container spacing={2}>
          <Grid  size={{xs:12}}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 2, display: 'flex', justifyContent: 'center' }}>
              Task Details
            </Typography>
          </Grid>
          <Grid  size={{xs:12}}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="h6">
                <b>Title:</b> {task.title}
              </Typography>
            </Box>
          </Grid>
          <Grid  size={{xs:12}}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="body1" >
                <b>Description:</b> {task.description}
              </Typography>
            </Box>
          </Grid>
          <Grid  size={{xs:12}}>
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="body1" >
                <b>Status:</b> <Chip label={task.status} color={task.status === 'completed' ? 'success' : 'warning'} sx={{ ml: 1 }} />
              </Typography>
            </Box>
          </Grid>
          <Grid  size={{xs:12}} >
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="body2">
                <b>Created At:</b> {moment(task.created_at).format("DD-MM-YYYY")}
              </Typography>
            </Box>
          </Grid>
          <Grid  size={{xs:12}} >
            <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
              <Typography variant="body2">
                <b>Updated At:</b> {moment(task.updated_at).format("DD-MM-YYYY")}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TaskDetails;