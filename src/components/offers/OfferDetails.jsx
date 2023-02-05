import { Box, Grid, MenuItem, Slide, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FormButton from "../Forms/FormButton";
import { Formik } from "formik";
import FormCard from "../Forms/FormCard";
import CustomTextField from "../Forms/CustomTextField";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
import useOffer from "../hooks/merchants/offers/useOffer";

const offerPercentages = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
function OfferDetails({
  showOffers,
  offerRange: offerRangesData,
  offerType: offerTypeData,
  offerId,
}) {
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const formValidation = yup.object().shape({
    brand: yup.string().ensure().required("brand is required!"),
  });
  const handleFormSubmit = () => {
    try {
    } catch (error) {}
  };

  const { offer } = useOffer(offerId, setServerErrors, setLoading);
  const initialValues = {
    total_people_buy_quantity: offer ? offer.total_people_buy_quantity : 0,
    total_people_get_quantity: offer ? offer.total_people_get_quantity : 0,
    offer_percentage: offer ? offer.offer_percentage + "%" : 0,
    offerType: offer ? offer.OfferType.name : "",
    offerRange: offer
      ? offer.OfferRange.lowestPrice +
        " - " +
        offer.OfferRange.highestPrice +
        " EGP"
      : "",
  };

  return (
    <Box height={"100%"}>
      <Slide in={!showOffers} direction="left" timeout={300}>
        <Box variant="contained" color="error">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={formValidation}
            enableReinitialize={true}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <FormCard
                serverErrors={serverErrors}
                loading={loading}
                handleSubmit={handleSubmit}
              >
                <Typography
                  sx={{ cursor: "pointer" }}
                  textAlign={"center"}
                  variant="h3"
                >
                  {loading ? "Loading" : offer?.name}
                </Typography>
                {!loading && (
                  <Box
                    display={"grid"}
                    gridTemplateColumns="1fr 1fr"
                    rowGap={4}
                    columnGap={2}
                  >
                    <CustomTextField
                      type={"text"}
                      name="total_people_get_quantity"
                      label={"Get Quantiy"}
                      errors={errors.total_people_get_quantity}
                      touched={touched.total_people_get_quantity}
                    />
                    <CustomTextField
                      type={"text"}
                      name="total_people_buy_quantity"
                      label={"Buy Quantiy"}
                      errors={errors.total_people_buy_quantity}
                      touched={touched.total_people_buy_quantity}
                    />

                    <Box
                      gridColumn={values.offerType !== "percentage" && "span 2"}
                    >
                      <CustomTextField
                        type={"text"}
                        name="offerType"
                        label={"Offer Type"}
                        errors={errors.offerType}
                        touched={touched.offerType}
                        select
                      >
                        {offerTypeData?.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Box>
                    {values.offerType === "percentage" && (
                      <CustomTextField
                        type={"text"}
                        name="offer_percentage"
                        label={"Offer Percentage"}
                        errors={errors.offer_percentage}
                        touched={touched.offer_percentage}
                        select
                      >
                        {offerPercentages?.map((item) => (
                          <MenuItem key={item} value={item + "%"}>
                            {item + "%"}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                    <Box gridColumn={"span 2"}>
                      <CustomTextField
                        type={"text"}
                        name="offerRange"
                        label={"Offer Rnage"}
                        errors={errors.offerRange}
                        touched={touched.offerRange}
                        select
                      >
                        {offerRangesData?.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </Box>
                  </Box>
                )}

                <FormButton theme={theme}>Create new Offer</FormButton>
              </FormCard>
            )}
          </Formik>
        </Box>
      </Slide>
    </Box>
  );
}

export default OfferDetails;
