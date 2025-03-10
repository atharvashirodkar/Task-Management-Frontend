import React, { useState } from "react";
import {
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from '@mui/material/Grid2';

const TaskSearch = ({ onSearch, onFilterChange }) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [title, setTitle] = useState("");
  const [filterType, setFilterType] = useState("title"); // Default filter type

  const handleSearch = () => {
    onSearch(query);
    onFilterChange({
      title,
      status,
      startDate: fromDate,
      endDate: toDate,
      q: query,
    });
  };

  const handleClear = () => {
    setQuery("");
    setStatus("");
    setFromDate("");
    setToDate("");
    setTitle("");
    onSearch("");
    onFilterChange({
      title: "",
      status: "",
      startDate: "",
      endDate: "",
      q: "",
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{xs:12, sm:6, md:4}}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter By</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter By"
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              <MenuItem value="dateRange">Date Range</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {filterType === "title" && (
          <Grid size={{xs:12, sm:6, md:8}}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Filter by title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
        )}

        {filterType === "status" && (
          <Grid size={{xs:12, sm:6, md:8}}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {filterType === "dateRange" && (
          <>
            <Grid size={{xs:12, sm:6, md:4}}>
              <TextField
                fullWidth
                variant="outlined"
                label="From Date"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid size={{xs:12, sm:6, md:4}}>
              <TextField
                fullWidth
                variant="outlined"
                label="To Date"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={handleClear}
          startIcon={<ClearIcon />}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default TaskSearch;