import React from "react";
import LinearProg from "../global/LinearProg";
import { Box, TablePagination, useMediaQuery } from "@mui/material";
import ContactUsContainer from "./ContactUsContainer";

function EmailsSectionCard({
  loading,
  error,
  model,
  page,
  handleChangePage,
  count,
  rowsPerPage,
  handleChangeRowsPerPage,
}) {
  const smallWidth = useMediaQuery("(max-width:600px)");
  return (
    <>
      <LinearProg loading={loading} />
      {error && <Box p={2}>Error , could not fetch messages</Box>}
      {model?.length === 0 && !error && !loading && (
        <Box p={2}>No Messages</Box>
      )}
      {model?.length > 0 && (
        <Box>
          <ContactUsContainer model={model} />
          <Box display={"flex"} justifyContent={"right"}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              count={count ? count : 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={!smallWidth && "Messages Per Page"}
              sx={{ border: "none" }}
              component={Box}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default EmailsSectionCard;
