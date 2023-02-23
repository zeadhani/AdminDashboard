import React from "react";
import CustomContainer from "../global/CustomContainer";
import { useTheme } from "@mui/system";
import { tokens } from "../../Theme";

function TeamDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <CustomContainer
      title={"Bogo team"}
      subtitle={"Managing bogo Team!"}
    ></CustomContainer>
  );
}

export default TeamDashboard;
