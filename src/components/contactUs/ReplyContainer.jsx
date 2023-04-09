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
import authFetch from "../../services/interceptors";

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
  const [replySubject, setReplySubject] = useState("");
  const [subjectError, setSubjectError] = useState(false);
  const count = useSelector((state) => state.Count.count);
  const dispatch = useDispatch();
  const handlereplyChange = () => {
    setReply((prev) => !prev);
  };
  const handleInputChange = (event) => {
    setReplyMessageError(false);
    setReplyMessage(event.target.value);
  };
  const handleSubjectChange = (event) => {
    setSubjectError(false);
    setReplySubject(event.target.value);
  };
  const handleSendMessage = async () => {
    if (!replySubject) {
      setSubjectError(true);
      return;
    }
    if (!replyMessage) {
      setReplyMessageError(true);
      return;
    }

    try {
      await authFetch.post("/contactus/reply", {
        userEmail: message.Users.email,
        message: replyMessage,
        id: message.id,
        subject:replySubject
      });
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
        <Box my={1} display={"flex"} flexDirection={"column"} gap={2}>
          <Typography variant="body2" color={"grey"}>
            Kindly input your message, as it will be sent as an email within a
            template.
          </Typography>
          <TextField
            label="Email Subject"
            rows={2}
            variant="outlined"
            fullWidth
            error={subjectError}
            value={replySubject}
            onChange={handleSubjectChange}
            helperText={subjectError ? "Please write a subject" : ""}
          />
          <TextField
            label="Enter your Email"
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
