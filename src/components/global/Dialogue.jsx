import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

import React from "react";
import LinearProg from "./LinearProg";

function Dialogue(props) {
  const {
    open,
    onClose,
    submit,
    children,
    title,
    theme,
    colors,
    loading,
    serverErrors,
  } = props;
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            background: colors.primary[900],
            borderRadius: 3,
          },
        }}
        {...props}
      >
        <LinearProg loading={loading} />
        <Box display={"flex"} justifyContent={"space-between"}>
          <DialogTitle
            id="dialogu-title"
            color={colors.grey[100]}
            fontWeight={"bold"}
          >
            {title}
          </DialogTitle>
          {serverErrors && (
            <Typography
              py={2}
              px={4}
              variant="body1"
              color={"#d32f2f"}
              fontWeight={"bold"}
            >
              {serverErrors}
            </Typography>
          )}
        </Box>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            onClick={submit}
            variant="text"
            color={theme.palette.mode === "dark" ? "secondary" : "primary"}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Dialogue;
