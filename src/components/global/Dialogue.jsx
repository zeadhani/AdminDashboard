import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";

import React from "react";
import LinearProg from "./LinearProg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dialogue({
  open,
  onClose,
  handlesaveitem,
  children,
  title,
  theme,
  colors,
  loading,
  servererrors,
  ...rest
}) {


  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            background: colors.primary[900],
            borderRadius: 3,
          },
        }}
        {...rest}
      >
        <LinearProg loading={loading === "true"} />
        <Box display={"flex"} justifyContent={"space-between"}>
          <DialogTitle
            id="dialogu-title"
            color={colors.grey[100]}
            fontWeight={"bold"}
          >
            {title}
          </DialogTitle>
          {servererrors && (
            <Typography
              py={2}
              px={4}
              variant="body1"
              color={"#d32f2f"}
              fontWeight={"bold"}
            >
              {servererrors}
            </Typography>
          )}
        </Box>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            onClick={handlesaveitem}
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
