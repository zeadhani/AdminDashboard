import React from "react";
import CustomContainer from "../global/CustomContainer";
import { useParams } from "react-router-dom";

function MessageDetails() {
  const { id } = useParams();
  return (
    <CustomContainer title="Bogo Settings" subtitle={"viewing a message"}>
      {id}
    </CustomContainer>
  );
}

export default MessageDetails;
