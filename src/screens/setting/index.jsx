import React from "react";
import CustomContainer from "../global/CustomContainer";
import { Box } from "@mui/system";

import SettingBox from "../../components/setting/settingBox";
import { useNavigate } from "react-router-dom";

function SettingDashboard() {
  const navigate = useNavigate();
  const handleUSerDataClick = () => {
    navigate("/setting/userData");
  };
  const handleBogoDataClick = () => {
    navigate("/setting/BogoData");
  };
  return (
    <CustomContainer
      title={"Bogo Settings"}
      subtitle={"Edit Your profile settings"}
    >
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(1fr,12)"}
        mt={2}
        height={"85vh"}
      >
        <SettingBox
          label={"edit your data"}
          handleClick={handleUSerDataClick}
        />
        <SettingBox
          label={"edit Bogo data"}
          mt={2}
          handleClick={handleBogoDataClick}
        />
      </Box>
    </CustomContainer>
  );
}

export default SettingDashboard;
