import { Button, IconButton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import CommonFilterContainer from "./CommonFilterContainer";
import { useState } from "react";
import { Close, Menu } from "@mui/icons-material";

function FilterContainer({
  children,
  theme,
  handleRestFilters,
  addNav,
  name,
  colors,
  search,
  handleSearchChange,
  handleSortChange,
  sort,
  handleOrderByChange,
  orderBy,
  sortArray,
  searchLabel,
  commonmodel,
}) {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleWindowResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Stack
      direction={"row"}
      width={"100%"}
      position={"relative"}
      spacing={3}
      sx={{
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      {width < 1200 && (
        <IconButton sx={{ marginRight: "auto" }} onClick={handleOpen}>
          {!open ? <Menu /> : <Close />}
        </IconButton>
      )}

      {
        <Stack
          direction={width < 1200 ? "column" : "row"}
          spacing={2}
          width={"100%"}
          height={ width <1200?"100%":"90%"}
          sx={
            width < 1200
              ? {
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? "rgba(0, 0, 20, 0.9)"
                      : "rgba(255, 255,255, 0.9)",
                  position: "absolute",
                  height: "fit-content",
                  top: "100%",
                  padding: "50px",
                  zIndex: "200",
                  right: "1px",
                  display: !open && "none",
                  minWidth: "200px",
                  overflowY: "scroll",
                }
              : {
                  display: "flex",
                }
          }
        >
          <CommonFilterContainer
            colors={colors}
            search={search}
            handleSearchChange={handleSearchChange}
            handleSortChange={handleSortChange}
            sort={sort}
            handleOrderByChange={handleOrderByChange}
            orderBy={orderBy}
            sortArray={sortArray}
            searchLabel={searchLabel}
            commonmodel={commonmodel}
          />
          {children}
        </Stack>
      }
      <Stack direction={"row"} spacing={1}>
        <Button
          variant={"outlined"}
          sx={{ height: "100%" }}
          color={theme.palette.mode === "dark" ? "info" : "warning"}
          onClick={handleRestFilters}
        >
          Reset Filters
        </Button>
        {name && (
          <Button
            variant="outlined"
            sx={{ height: "100%" }}
            color={theme.palette.mode === "dark" ? "secondary" : "primary"}
            onClick={addNav}
          >
            Add new {name}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default FilterContainer;
