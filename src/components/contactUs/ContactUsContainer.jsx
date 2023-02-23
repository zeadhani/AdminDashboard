import { List } from "@mui/material";
import React from "react";
import ContactUsItem from "./contactUsItem";
import { toast } from "react-toastify";
import authFetch from "../../services/interceptors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { messageCountActions } from "../../store/messageCountSlice";

function ContactUsContainer({ model, getcontactUs }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDeleteMessage = (id) => {
    return async () => {
      try {
        const res = await authFetch.delete(`/contactus/${id}`);
        if (res.status === 200) {
          getcontactUs();
          dispatch(messageCountActions.decreaseCount());
          toast("Message Deleted!");
        }
      } catch (error) {
        toast("Failed to Delete");
      }
    };
  };

  const handleShowMessage = (id) => {
    return () => {
      navigate(`/notifications/reply/${id}`);
    };
  };
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "transparent",
        height: "67vh",
        overflowY: "scroll",
      }}
    >
      {model?.map((row, index) => {
        const isReplied = row.replied;
        return (
          <ContactUsItem
            key={row.id}
            item={row}
            isReplied={isReplied}
            handleDeleteMessage={handleDeleteMessage}
            handleShowMessage={handleShowMessage}
          />
        );
      })}
    </List>
  );
}

export default ContactUsContainer;
