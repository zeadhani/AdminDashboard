import { Box } from "@mui/material";
import React from "react";
import PersonLine from "../orders/orderItem/PersonLine";

function ProfileDetails({ user }) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <Box display={"flex"} gap={4}>
        <PersonLine label={"First Name"} data={user?.first_name} />
        <PersonLine label={"Last Name"} data={user?.last_name} />
      </Box>
      <PersonLine label={"Email"} data={user?.email} />
      <PersonLine label={"Address"} data={user?.address} />
      <PersonLine label={"Phone"} data={user?.phone} />
      <PersonLine label={"role"} data={user?.roles?.role} />
      <PersonLine
        label={"Ntaional Id Image"}
        image={user?.nationalIdImage}
        data={"Natioanal Id Image"}
      />
    </Box>
  );
}

export default ProfileDetails;
