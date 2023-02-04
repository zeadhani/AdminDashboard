import { Box, MenuItem, Slide } from "@mui/material";
import React from "react";
import FormButton from "../Forms/FormButton";
import { Formik } from "formik";
import FormCard from "../Forms/FormCard";
import CustomTextField from "../Forms/CustomTextField";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
const initialValues = {
  total_people_buy_quantity: 0,
  total_people_get_quantity: 0,
  offer_percentage: 0,
  description: "",
  offerType: "",
  highestPrice: 0,
  lowestPrice: 0,
  brand: "",
};

function OfferDetails({ showOffers, offerRange, offerType }) {
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const formValidation = yup.object().shape({
    brand: yup.string().ensure().required("brand is required!"),
  });
  const handleFormSubmit = () => {};

  return (
    <Box height={"100%"}>
      <Slide in={!showOffers} direction="left" timeout={300}>
        <Box variant="contained" color="error">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={formValidation}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
            }) => (
              <FormCard
                serverErrors={serverErrors}
                loading={loading}
                handleSubmit={handleSubmit}
              >
                <CustomTextField
                  type={"text"}
                  name="brand"
                  label={"Brand Name"}
                  value={values.brand}
                  errors={errors.brand}
                  touched={touched.brand}
                />
                {/* <CustomTextField
                  type={"text"}
                  name="email"
                  label={"Brand Email"}
                  handleblur={handleBlur}
                  handleChange={handleChange}
                  value={values.email}
                  touched={touched.email}
                  errors={errors.email}
                /> */}

                {/* <CustomTextField
                type={"text"}
                name="prefrence"
                label={"Product Preference"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.prefrence}
                touched={touched.prefrence}
                errors={errors.prefrence}
                select
            >
                {offerType?.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                    {item.name}
                </MenuItem>
                ))}
            </CustomTextField> */}
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
