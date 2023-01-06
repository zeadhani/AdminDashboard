import { Button, Stack, TextField } from "@mui/material";
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
        <Stack
          key={item}
          direction={"row"}
          spacing={2}
          justifyContent={"center"}
        >
          {Object.keys(item).map((itemkey) => (
            <TextField
              key={itemkey}
              label={itemkey}
              error={itemkey === "count" && index === indexcount}
              onChange={(e) =>
                handleChangeattribute(e.target.value, index, itemkey)
              }
            />
          ))}
        </Stack>
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
