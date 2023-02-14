import React from "react";
import useUser from "../../components/hooks/auth/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import FormCard from "../../components/Forms/FormCard";
import { Formik } from "formik";
import CustomTextField from "../../components/Forms/CustomTextField";
import FormButton from "../../components/Forms/FormButton";
import { useTheme } from "@emotion/react";
import * as yup from "yup";
import { tokens } from "../../Theme";
import { useState } from "react";
import CustomContainer from "../global/CustomContainer";
import { handleTitleClick } from "../../utils/functions";
import { useEffect } from "react";
function UserDetails() {
  let { email } = useParams();
  const { user } = useUser(email);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState();
  const handleFormSubmit = () => {};
  const initialValues = {
    first_name: user.first_name ? user.first_name : "test",
    last_name: user.last_name ? user.last_name : "",
    email: user.email ? user.email : "",
    address: user.address ? user.address : "",
    phone: user.phone ? user.phone : "",
  };
  const formValidation = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
  });
  useEffect(() => {
    if (user) {
      setVerified(user.verified);
    }
  }, [user]);
  return (
    <CustomContainer
      title={"BOGO USERS"}
      subtitle={"Viewing your bogo user!"}
      onClick={() => handleTitleClick(navigate, "Users")}
    >
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
            <CustomTextField
              type={"text"}
              name="first_name"
              label={"First Name"}
              errors={errors.first_name}
              touched={touched.first_name}
            />
            <CustomTextField
              type={"text"}
              name="last_name"
              label={"Last Name"}
              errors={errors.last_name}
              touched={touched.last_name}
            />
            <CustomTextField
              type={"text"}
              name="email"
              label={"Email "}
              errors={errors.email}
              touched={touched.email}
            />
            <CustomTextField
              type={"text"}
              name="address"
              label={"Address"}
              errors={errors.address}
              touched={touched.address}
            />
            <CustomTextField
              type={"text"}
              name="phone"
              label={"Mobile Number"}
              errors={errors.phone}
              touched={touched.phone}
            />

            {email && (
              <Typography
                variant="h4"
                fontWeight={"bold"}
                textTransform={"uppercase"}
                color={
                  verified ? colors.greenAccent[500] : colors.redAccent[500]
                }
              >
                {verified ? "verified" : "Not Verified"}
              </Typography>
            )}
            <FormButton theme={theme}>
              {email
                ? user.verified
                  ? "Unverify User"
                  : "verify user"
                : "Create New User"}
            </FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default UserDetails;
