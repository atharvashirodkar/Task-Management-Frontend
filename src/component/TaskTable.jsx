import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";
import moment from "moment";

const TaskTable = ({
  tasks,
  onEdit,
  onDelete,
  onView,
  paginationModel,
  onPageChange,
  onLimitChange,
  totalTasks,
}) => {
  const { page, limit } = paginationModel;


  return (
    <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "linear-gradient(135deg, #e3f2fd, #bbdefb)" }}>
            <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>Created At</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.length === 0 ?
            (<TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{ fontWeight: "bold", color: "#212121" }}
              >
                No tasks found.
              </TableCell>
            </TableRow>) : (
              tasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" }, transition: "background-color 0.3s" }}
                >
                  <TableCell sx={{ wordBreak: "break-word" }}>{task.title}</TableCell>
                  <TableCell sx={{ wordBreak: "break-word" }}>{task.description}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "inline-block",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor:
                          task.status === "Completed"
                            ? "#4CAF50"
                            : task.status === "In Progress"
                              ? "#FFC107"
                              : "#F44336",
                        color: "#fff",
                        fontWeight: "bold",
                        textAlign: "center",
                        minWidth: "100px",
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
              )))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalTasks}
        rowsPerPage={limit}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onLimitChange}
        sx={{
          ".MuiTablePagination-toolbar": {
            backgroundColor: "#f1f1f1",
            borderRadius: "0 0 8px 8px",
          },
          ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows": {
            color: "#333",
          },
        }}
      />
    </TableContainer>
  );
};

export default TaskTable;