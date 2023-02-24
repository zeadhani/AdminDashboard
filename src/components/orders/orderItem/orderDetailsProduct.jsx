import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import PersonLine from "./PersonLine";
import { LazyLoadImage } from "react-lazy-load-image-component";

function OrderDetailsProduct({ item }) {
  const isXSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: { xs: "column-reverse", sm: "row" },
          gap: 2,
          width: "100%",
        }}
      >
        <Box alignSelf={"center"} textAlign={"center"}>
          <Typography
            variant="h5"
            border={"1px solid "}
            padding={"5px 10px"}
            mx={"auto"}
            sx={{ cursor: "pointer", width: "fit-content" }}
          >
            {item?.Product.name}
          </Typography>
          {item?.ProductItems && (
            <Box mt={1} display={"flex"} gap={1}>
              {item?.ProductItems.ProductAttributesValues.map((itemData) => (
                <PersonLine
                  key={itemData.id}
                  label={itemData.attribute.name}
                  data={itemData.value}
                />
              ))}
            </Box>
          )}
        </Box>
        <LazyLoadImage
          style={{
            height: 70,
            cursor: "pointer",
            margin: isXSmallScreen && "auto",
          }}
          alt={item?.Product.name}
          src={`${process.env.REACT_APP_DRIVE_URL}${item?.Product.image}`}
        />
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: "fit-content",
          display: "flex",
          gap: 2,
          mt: 2,
        }}
      >
        <Typography
          sx={{
            textDecoration: "line-through",
            color: "#666",
          }}
          variant="h6"
          alignSelf={"center"}
        >
          {item?.Product.price}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#007bff",
          }}
          variant="h4"
        >
          {Math.round(item?.price * 100) / 100} EGP
        </Typography>
      </Box>
    </Box>
  );
}

export default OrderDetailsProduct;
