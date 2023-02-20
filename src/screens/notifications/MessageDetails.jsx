import React from "react";
import CustomContainer from "../global/CustomContainer";
import { useNavigate, useParams } from "react-router-dom";
import useSingleContactUs from "../../components/hooks/contactus/useSingleContactUs";
import { Typography } from "@mui/material";
import { useState } from "react";
import LoadingMessage from "../../components/contactUs/loadingMessage";
import ReplyContainer from "../../components/contactUs/ReplyContainer";
import { handleTitleClick } from "../../utils/functions";

function MessageDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { message } = useSingleContactUs(id, setLoading);
  return (
    <CustomContainer
      title="Bogo Messages"
      subtitle={"viewing a message"}
      onClick={() => handleTitleClick(navigate, "notifications")}
    >
      {!message && !loading && (
        <Typography>Error couldn't Load data</Typography>
      )}
      {loading && <LoadingMessage />}
      {!loading && message && <ReplyContainer message={message} />}
    </CustomContainer>
  );
}

export default MessageDetails;
