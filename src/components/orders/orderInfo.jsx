import { Box, Typography } from "@mui/material";

function OrderInfo({ order }) {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      textTransform={"uppercase"}
    >
      <Box>
        <Typography my={2} variant="h5">
          Brand : {order?.offers.Brands.name}
        </Typography>
        <Typography my={2} variant="h6">
          Brand Offer : {order?.offers.name}
        </Typography>
      </Box>

      <Typography my={2} variant="h5">
        Order Total : {order?.total} EGP
      </Typography>
    </Box>
  );
}

export default OrderInfo;
