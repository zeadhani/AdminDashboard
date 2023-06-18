import React from "react";
import CustomContainer from "../global/CustomContainer";
import { Formik } from "formik";
import FormCard from "../../components/Forms/FormCard";
import CustomTextField from "../../components/Forms/CustomTextField";
import FormButton from "../../components/Forms/FormButton";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@emotion/react";
import authFetch from "../../services/interceptors";
import { toast } from "react-toastify";
const initialValues = {
  lowestPrice: 0,
  highestPrice: 0,
};
function OfferRangeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const theme = useTheme();
  const [serverErrors, setServerErrors] = useState();
  const handleTitleNavigate = () => {
    navigate("/OfferRanges");
  };
  const formValidation = yup.object().shape({
    lowestPrice: yup
      .number()
      .required(`Lowest Price is required`)
      .min(1, "Lowest Price must be greater than zero"),
    highestPrice: yup
      .number()
      .required("Highest Price is required")
      .min(1, "Highest Price must be greater than zero")
      .test(
        "is-greater",
        "Highest Price must be greater than Lowest Price",
        function (value) {
          const { lowestPrice } = this.parent;
          return value > lowestPrice;
        }
      ),
  });

  const handleFormSubmit = async (values) => {
    setServerErrors("");
    const { lowestPrice, highestPrice } = values;

    setLoading(true);
    try {
      const res = await authFetch.post(`/offerrange`, {
        lowestPrice,
        highestPrice,
      });
      if (res.statusText !== "OK") return;
      toast.success(`Added successfully`);
    } catch (error) {
      setServerErrors(error.response.data.error);
    }
    setLoading(false);
  };
  return (
    <CustomContainer
      title={"Bogo ranges"}
      subtitle={"managing offer ranges!"}
      onClick={handleTitleNavigate}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
      >
        {({ errors, touched, handleSubmit }) => (
          <FormCard
            serverErrors={serverErrors}
            loading={loading}
            handleSubmit={handleSubmit}
          >
            <CustomTextField
              type={"text"}
              name="lowestPrice"
              label={`Lowest Price`}
              touched={touched.lowestPrice}
              errors={errors.lowestPrice}
            />
            <CustomTextField
              type={"text"}
              name="highestPrice"
              label={`Highest Price`}
              touched={touched.highestPrice}
              errors={errors.highestPrice}
            />
            <FormButton theme={theme}>Create new Range</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default OfferRangeDetails;
