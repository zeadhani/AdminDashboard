import { List } from "@mui/material";
import React from "react";
import ContactUsItem from "./contactUsItem";

function ContactUsContainer({ model }) {
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "transparent",
        maxHeight: "67vh",
        overflowY: "scroll",
      }}
    >
      {model?.map((row, index) => {
        const isReplied = row.replied;
        return <ContactUsItem key={row.id} item={row} isReplied={isReplied} />;
      })}
    </List>
  );
}

export default ContactUsContainer;
