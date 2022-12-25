import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "#1F2A40" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function CustomAccordion({ name, handleChange, expanded, count, attr }) {
  const { color, size, flavor } = attr;
  return (
    <Accordion expanded={expanded === name} onChange={handleChange(name)}>
      <AccordionSummary>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"column"} spacing={2}>
          {count && <Typography> Items in stock : {count}</Typography>}
          <Stack direction={"row"} spacing={2}>
            {color && <Typography> color : {attr.color}</Typography>}
            {flavor != null && <Typography> flavor : {flavor}</Typography>}
            {size && <Typography> size : {size}</Typography>}
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;
