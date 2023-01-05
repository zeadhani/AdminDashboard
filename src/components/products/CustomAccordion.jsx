import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Dialogue from "../global/Dialogue";
import CustomTextField from "../Forms/CustomTextField";
import { tokens } from "../../Theme";
import axios from "axios";
import { toast } from "react-toastify";

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

function CustomAccordion({
  name,
  handleChange,
  expanded,
  count,
  attr,
  editable,
  deleteItem,
  title,
  getProduct,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = React.useState();
  const [countState, setCount] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState();

  const handleChangeinputs = (e, key) => {
    setLoading(false);
    setServerErrors("");
    const state = { ...formState, [key]: e.target.value };
    setFormState(state);
  };
  React.useEffect(() => {
    setFormState(attr);
    setCount(count);
  }, []);
  const handleSaveItem = async () => {
    setLoading(true);
    setServerErrors("");
    for (let i = 0; i < Object.keys(formState).length; i++) {
      if (
        Object.values(formState)[i] === null ||
        Object.values(formState)[i] === ""
      ) {
        setServerErrors("Please fill all fields");
        setLoading(false);
        return;
      }
    }
    if (countState === null || countState === "") {
      setServerErrors("Please fill all fields");
      setLoading(false);
      return;
    }

    let data = {
      ...formState,
      count: countState,
    };

    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/products/${title}/item/${name}`,
        data
      );
      if (res.status === 200) {
        // setCount(res.data.count);
        // Object.keys(formState).map((key) => {
        //   for (let i = 0; i < res.data.ProductAttributesValues.length; i++) {

        //   if(key=== res.data.ProductAttributesValues[i].attribute.name){
        //    setFormState({...formState,[key]:res.data.ProductAttributesValues[i].value})
        //   };
        //   }
        // });
        // console.log(formState);
        getProduct();
        setOpen(false);
        toast("edited");
      }
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  const hanldeClose = () => {
    setLoading(false);
    setOpen(false);
    setServerErrors("");
  };
  return (
    <>
      <Accordion expanded={expanded === name} onChange={handleChange(name)}>
        <AccordionSummary>
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={"column"} spacing={2}>
            <Typography>Items in stock : {count}</Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                alignItems={"center"}
              >
                {Object.entries(attr).map(([key, val]) => {
                  return (
                    <Typography>
                      {key} : {val}
                    </Typography>
                  );
                })}
              </Stack>
              {editable && (
                <Stack direction={"row"} spacing={2}>
                  <Button
                    startIcon={<Edit />}
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => {
                      setOpen(true);
                    }}
                    disableElevation
                  >
                    Edit
                  </Button>
                  {Object.entries(attr).length !== 0 && (
                    <Button
                      endIcon={<Delete />}
                      color={"primary"}
                      variant="contained"
                      size="small"
                      disableElevation
                      onClick={() => deleteItem(name)}
                    >
                      Delete
                    </Button>
                  )}
                </Stack>
              )}
            </Box>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {editable && (
        <Dialogue
          open={open}
          onClose={hanldeClose}
          submit={handleSaveItem}
          title={name}
          theme={theme}
          colors={colors}
          loading={loading}
          serverErrors={serverErrors}
        >
          <Stack direction={"row"} spacing={1}>
            {Object.entries(attr).map(([key, val]) => {
              return (
                <CustomTextField
                  value={formState ? formState[key] : ""}
                  label={key}
                  onChange={(e) => handleChangeinputs(e, key)}
                  type={"text"}
                />
              );
            })}
            <CustomTextField
              value={countState}
              label={"count"}
              onChange={(e) => setCount(e.target.value)}
            />
          </Stack>
        </Dialogue>
      )}
    </>
  );
}

export default CustomAccordion;
