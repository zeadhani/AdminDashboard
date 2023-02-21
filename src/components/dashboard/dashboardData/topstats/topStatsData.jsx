import React from "react";
import TopStatsContainer from "./TopStatsContainer";
import StateBox from "../../../global/stateBox";
import { AttachMoney, Email, PeopleOutlined, Person } from "@mui/icons-material";

function TopStatsData({colors}) {
  return (
    <>
      <TopStatsContainer colors={colors}>
        <StateBox
          title="1,263"
          subtitle="Emails Sent"
          progress="0.25"
          increase="+12%"
          icon={
            <Email sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          }
        />
      </TopStatsContainer>
      <TopStatsContainer colors={colors}>
        <StateBox
          title="431,225"
          subtitle="Requests Received"
          progress="0.70"
          increase="+31%"
          icon={
            <AttachMoney
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </TopStatsContainer>
      <TopStatsContainer colors={colors}>
        <StateBox
          title="441"
          subtitle="New Merchants"
          progress="0.40"
          increase="+5%"
          icon={
            <PeopleOutlined
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </TopStatsContainer>
      <TopStatsContainer colors={colors}>
        <StateBox
          title="345,732"
          subtitle="New Bogo Users"
          progress="0.80"
          increase="+43%"
          icon={
            <Person sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          }
        />
      </TopStatsContainer>
    </>
  );
}

export default TopStatsData;
    