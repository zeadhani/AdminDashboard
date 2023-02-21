import React from "react";
import CustomContainer from "../global/CustomContainer";
import { handleTitleClick } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FormButton from "../../components/Forms/FormButton";
import { Formik } from "formik";
import FormCard from "../../components/Forms/FormCard";
import CustomTextField from "../../components/Forms/CustomTextField";
import { toast } from "react-toastify";
import { useState } from "react";
import authFetch from "../../services/interceptors";
import * as yup from "yup";
import { useTheme } from "@mui/material";
const initialValues = {
  oldPassword: "",
  newPassword: "",
};
function ChangePassword() {
  const theme = useTheme();
  const navigate = useNavigate();
  const data = useSelector((state) => state.Auth.user);
  const email = data.replace(/"/g, "");
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);

  const handleFormSubmit = async (values) => {
    setServerErrors("");

    setLoading(true);
    const { oldPassword, newPassword } = values;
    try {
      const res = await authFetch.patch(`/user/editpassword/${email}`, {
        oldPassword,
        newPassword,
      });
      if (res.statusText !== "OK") return;
      toast("Password updated successfully");
    } catch (error) {
      setServerErrors(error.response.data.error);
    }
    setLoading(false);
  };

  const formValidation = yup.object().shape({
    oldPassword: yup.string().min(8).required("old Password  is required"),
    newPassword: yup.string().min(8).required("new Password  is required"),
  });

  return (
    <CustomContainer
      title={"Bogo settings"}
      subtitle={"editing Your password"}
      onClick={() => handleTitleClick(navigate, "Setting")}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <FormCard
            serverErrors={serverErrors}
            loading={loading}
            handleSubmit={handleSubmit}
          >
            <CustomTextField
              type={"password"}
              name="oldPassword"
              label={"Old Password"}
              touched={touched.oldPassword}
              errors={errors.oldPassword}
            />
            <CustomTextField
              type={"password"}
              name="newPassword"
              label={"New Password"}
              touched={touched.newPassword}
              errors={errors.newPassword}
            />

            <FormButton theme={theme}>Save</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default ChangePassword;
