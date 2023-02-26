import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomContainer from "../../screens/global/CustomContainer";
import { Formik } from "formik";
import { useState } from "react";
import FormCard from "../../components/Forms/FormCard";
import FormButton from "../../components/Forms/FormButton";
import { useTheme } from "@mui/material";
import CustomTextField from "../Forms/CustomTextField";
import * as yup from "yup";
import authFetch from "../../services/interceptors";
import { toast } from "react-toastify";
const initialValues = { name: "" };
function AddNew() {
  const { model } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const theme = useTheme();
  const [serverErrors, setServerErrors] = useState();
  const handleGoBack = () => {
    navigate(-1);
  };
  const formValidation = yup.object().shape({
    name: yup.string().required(`${model} Name is required`),
  });

  const handleFormSubmit = async (values) => {
    setServerErrors("");
    const { name } = values;

    setLoading(true);
    try {
      const res = await authFetch.post(`/${model}`, { name });
      if (res.statusText !== "OK") return;
      toast(`${model} added successfully`);
    } catch (error) {
      setServerErrors(error.response.data.error);
    }
    setLoading(false);
  };
  return (
    <CustomContainer
      title={`BOGO ${model}`}
      subtitle={`Add new bogo ${model}!`}
      onClick={handleGoBack}
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
              name="name"
              label={`${model} name`}
              touched={touched.name}
              errors={errors.name}
            />

            <FormButton theme={theme}>Create new {model}</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default AddNew;
