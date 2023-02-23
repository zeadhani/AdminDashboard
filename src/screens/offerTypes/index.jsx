import React from "react";
import CustomContainer from "../global/CustomContainer";
import CommonModelContainer from "../../components/commonDataModelUI/CommonModelContainer";

function OfferTypesDashboard() {
  return (
    <CustomContainer title={"bogo types"} subtitle={"managing offer types!"}>
      <CommonModelContainer model={"offertype"} />
    </CustomContainer>
  );
}

export default OfferTypesDashboard;
