import { Box, Button, Stack, TextField } from "@mui/material";
import React from "react";

function AddAttributes({
  attributesData,
  handleChangeattribute,
  indexcount,
  allattributes,
  setattributesData,
}) {
  const addAttribute = () => {
    let newarray = [...attributesData];
    let obj = {};
    allattributes.map((item) => {
      obj[item.name] = null;
    });
    obj["count"] = null;
    newarray.push(obj);
    setattributesData(newarray);
  };
  const removeAttribute = () => {
    let newarray = [...attributesData];
    newarray.pop();
    setattributesData(newarray);
  };
  return (
    <React.Fragment>
      {attributesData.map((item, index) => (
        <Box
          key={item +index}
          display={"grid"}
          sx={{
            gridTemplateColumns: {
              lg: "repeat(12, 1fr)",
              xs: "repeat(3, 1fr)",
              sm: "repeat(6, 1fr)",
            },
          }}
          gap={1}
        >
          {Object.keys(item).map((itemkey) => (
            <TextField
              key={itemkey}
              sx={{ gridColumn: "span 3" }}
              label={itemkey}
              error={itemkey === "count" && index === indexcount}
              onChange={(e) =>
                handleChangeattribute(e.target.value, index, itemkey)
              }
            />
          ))}
        </Box>
      ))}

      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        <Button
          disableRipple
          onClick={addAttribute}
          sx={{
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
          color="info"
        >
          Add attribute
        </Button>
        {attributesData.length > 0 && (
          <Button
            disableRipple
            onClick={removeAttribute}
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            color="error"
          >
            Remove
          </Button>
        )}
      </Stack>
    </React.Fragment>
  );
}

export default AddAttributes;
