import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, CircularProgress, Typography, Box, TablePagination } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import moment from "moment";

const TaskTable = ({ tasks, onEdit, onDelete, onView, loading, paginationModel, onPageChange, onRowsPerPageChange }) => {
  if (loading) return <CircularProgress sx={{ mt: 2 }} />;

  // Pagination logic
  const { page, rowsPerPage } = paginationModel;
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageTasks = tasks.slice(startIndex, endIndex);

  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '' }}>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>Created At</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        {tasks.length !== 0 ? (<TableBody>
          {currentPageTasks.map((task) => (
            <TableRow key={task.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor:
                      task.status === 'Pending'
                        ? 'warning.light'
                        : task.status === 'In Progress'
                          ? 'info.light'
                          : 'success.light',
                    color: 'common.white',
                  }}
                >
                  {task.status}
                </Box>
              </TableCell>
              <TableCell>{moment(task.created_at).format("DD-MM-YYYY")}</TableCell>
              <TableCell>
                <Tooltip title="Edit Task">
                  <IconButton color="secondary" onClick={() => onEdit(task.id)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Task">
                  <IconButton color="error" onClick={() => onDelete(task.id)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip title="View Task">
                  <IconButton color="primary" onClick={() => onView(task.id)}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>) :
          (<Typography sx={{ mt: 2, display: 'flex' }}>No tasks found...</Typography>)
        }
      </Table>

      {/* TablePagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length} // Total number of tasks
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default TaskTable;