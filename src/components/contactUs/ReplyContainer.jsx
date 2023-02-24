import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { messageCountActions } from "../../store/messageCountSlice";

const BoxButton = ({ theme, matches, onClick, children }) => {
  return (
    <Box display="flex" justifyContent="end">
      <Button
        variant="outlined"
        color={theme.palette.mode === "dark" ? "secondary" : "primary"}
        size={matches ? "medium" : "large"}
        onClick={onClick}
      >
        {children}
      </Button>
    </Box>
  );
};
function ReplyContainer({ message }) {
  const theme = useTheme();
  const [replied, setReplied] = useState(message.replied);
  const [reply, setReply] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");
  const [replyMessage, setReplyMessage] = useState("");
  const [replyMessageError, setReplyMessageError] = useState(false);
  const count = useSelector((state) => state.Count.count);
  const dispatch = useDispatch();
  const handlereplyChange = () => {
    setReply((prev) => !prev);
  };
  const handleInputChange = (event) => {
    setReplyMessageError(false);
    setReplyMessage(event.target.value);
  };
  const handleSendMessage = async () => {
    if (!replyMessage) {
      setReplyMessageError(true);
      return;
    }
    try {
      toast.success("Email sent");
      setReplied(true);
      setReply(false);
      dispatch(messageCountActions.setcount({ count: count - 1 }));
    } catch (error) {
      toast.error("Failed to send");
    }
  };
  return (
    <Box mt={2}>
      <Stack direction={"row"} spacing={1}>
        <Avatar
          src={`${process.env.REACT_APP_CLOUDINARY}${message.Users?.image}`}
          sx={{ height: "30px", width: "30px" }}
        />
        <Stack direction={"row"} spacing={2}>
          <Typography variant="h6" alignSelf={"center"}>
            {message.Users?.email}
          </Typography>
          <Typography
            variant="h6"
            alignSelf={"center"}
            color={!replied ? "red" : "green"}
          >
            -- {replied ? "replied" : "Not replied"}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="body2" p={3}>
        {message.message}
      </Typography>
      {!replied && (
        <>
          <Divider sx={{ mb: 2 }} />
          <BoxButton
            theme={theme}
            matches={matches}
            onClick={handlereplyChange}
          >
            {reply ? "Cancel" : "Reply"}
          </BoxButton>
        </>
      )}
      {reply && (
        <Box my={2} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography variant="body2" color={"grey"}>
            Kindly input your message, as it will be sent as an email within a
            template.
          </Typography>
          <TextField
            label="Enter your message"
            multiline
            rows={10}
            variant="outlined"
            fullWidth
            error={replyMessageError}
            value={replyMessage}
            onChange={handleInputChange}
            helperText={replyMessageError ? "Please write a message" : ""}
          />
          <BoxButton
            theme={theme}
            matches={matches}
            onClick={handleSendMessage}
          >
            Send
          </BoxButton>
        </Box>
      )}
    </Box>
  );
}

export default ReplyContainer;
