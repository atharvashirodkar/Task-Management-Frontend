import React, { useState, useEffect } from "react";
import { Box, TextField, InputAdornment, IconButton, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const TaskSearch = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => onSearch(query), 500);
    return () => clearTimeout(debounceTimer);
  }, [query, onSearch]);

  return (
    <Box>
        <TextField
          fullWidth
          placeholder="Type to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon sx={{ color: 'black' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: 'rgba(255, 209, 209, 0.1)',
            borderRadius: 10,
            border: 2,
            color: 'black',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 98, 255, 0.6)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
          }}
        />
    </Box>
  );
};

export default TaskSearch;