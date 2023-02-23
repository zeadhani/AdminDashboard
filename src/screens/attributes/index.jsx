import React from "react";
import CustomContainer from "../global/CustomContainer";
import CommonModelContainer from "../../components/commonDataModelUI/CommonModelContainer";

function AttributeDashboard() {
  return (
    <CustomContainer
      title={"Bogo Attributes"}
      subtitle={"Managing bogo Attributes!"}
    >
      <CommonModelContainer model={"attribute"} />
    </CustomContainer>
  );
}

export default AttributeDashboard;
