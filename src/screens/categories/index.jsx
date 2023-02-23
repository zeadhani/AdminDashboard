import React from "react";
import CustomContainer from "../global/CustomContainer";
import CommonModelContainer from "../../components/commonDataModelUI/CommonModelContainer";

function CategoriesDashboard() {
  return (
    <CustomContainer
      title={"Bogo categories"}
      subtitle={"Managing bogo categories!"}
    >
      <CommonModelContainer model={"category"} />
    </CustomContainer>
  );
}

export default CategoriesDashboard;
