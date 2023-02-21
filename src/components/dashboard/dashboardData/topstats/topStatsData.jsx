import React from "react";
import TopStatsContainer from "./TopStatsContainer";
import StateBox from "../../../global/stateBox";
import {
  Diversity3Outlined,
  Email,
  PeopleOutlined,
  Person,
} from "@mui/icons-material";

function TopStatsData({ colors, messages, requests, merchants, users }) {
  return (
    <>
      <TopStatsContainer colors={colors}>
        <StateBox
          title={messages}
          subtitle="Messages Received"
          progress="0.25"
          increase="+12%"
          icon={
            <Email sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
          }
        />
      </TopStatsContainer>
      <TopStatsContainer colors={colors}>
        <StateBox
          title={requests}
          subtitle="Requests Received"
          progress="0.70"
          increase="+31%"
          icon={
            <Diversity3Outlined
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </TopStatsContainer>
      <TopStatsContainer colors={colors}>
        <StateBox
          title={merchants}
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
          title={users}
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
