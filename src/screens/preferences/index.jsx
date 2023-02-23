import React from "react";
import CustomContainer from "../global/CustomContainer";
import CommonModelContainer from "../../components/commonDataModelUI/CommonModelContainer";

function PreferencesDashboard() {
  return (
    <CustomContainer
      title={"bogo preferences"}
      subtitle={"managing preferences!"}
    >
      <CommonModelContainer model={"pref"} />
    </CustomContainer>
  );
}

export default PreferencesDashboard;
