import { useTheme } from '@emotion/react';
import { Box, LinearProgress } from '@mui/material'
import React from 'react'

function LinearProg({loading}) {
    const theme = useTheme();
  return (
    <Box sx={{ width: "100%" }} height={4}>
    {loading && (
      <LinearProgress
        color={theme.palette.mode === "dark" ? "info" : "primary"}
        sx={{ height: "3px" }}
      />
    )}
  </Box>

  )
}

export default LinearProg