import { DeleteOutline, Message } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

function ContactUsItem({
  item,
  isReplied,
  handleDeleteMessage,
  handleShowMessage,
}) {
  return (
    <>
      <ListItem alignItems="flex-start" sx={{ cursor: "pointer" }}>
        <ListItemAvatar>
          <Avatar
            src={`${process.env.REACT_APP_DRIVE_URL}${item.Users?.image}`}
          />
        </ListItemAvatar>

        <ListItemText
          sx={{
            overflow: "hidden",
            maxWidth: "70%",
            maxHeight: "100px",
          }}
          primary={item.Users?.email}
          secondary={
            <>
              <Typography
                sx={{
                  display: "inline",
                }}
                component="span"
                variant="body2"
                color={isReplied ? "green" : "red"}
              >
                {isReplied ? "Replied" : "Not Replied"}
              </Typography>

              {` — ${item.message} `}
            </>
          }
        />

        <ListItemSecondaryAction>
          <IconButton size="small" onClick={handleDeleteMessage(item.id)}>
            <DeleteOutline />
          </IconButton>
          <IconButton
            size="small"
            color="seconadry"
            onClick={handleShowMessage(item.id)}
          >
            <Message />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default ContactUsItem;
