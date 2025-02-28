import React, { useEffect, useState } from "react";
import { getTaskById } from "../services/taskService";
import { Container, Typography, Paper, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import moment from "moment";
import Grid from '@mui/material/Grid2'

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
    <Container sx={{ display: 'flex', justifyContent: 'center', height: '65vh' }}>
      <Paper sx={{ p: 4, borderRadius: 2, boxShadow: 3, width: '80%', height: '80%' }}>
        <Grid spacing={2}>
          <Grid sx={{m: 2}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Task Details :
            </Typography>
          </Grid>
          <Grid sx={{m: 2}}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Title: {task.title}
            </Typography>
          </Grid>
          <Grid sx={{m: 2}}>
            <Box>
              <Typography>
                Description: {task.description}
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{m: 2}}>
            <Box>
              <Typography>
                Status: {task.status}
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{m: 2}}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Created At: {moment(task.created_at).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
          <Grid sx={{m: 2}}>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              Updated At: {moment(task.updated_at).format("DD-MM-YYYY")}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default TaskDetails;