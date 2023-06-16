import React from "react";
import useUser from "../../components/hooks/auth/useUser";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem, Typography } from "@mui/material";
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
import authFetch from "../../services/interceptors";
import useRoles from "../../components/hooks/users/useRoles";
import ImageFileDisplay from "../../components/Forms/imageFileDisplay";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import useImage from "../../components/hooks/general/useImage";
import usePreferences from "../../components/hooks/merchants/usepreferences";
import CustomSelect from "../../components/Forms/CustomSelect";
import { toast } from "react-toastify";
import axios from "axios";

function UserDetails() {
  let { email } = useParams();
  const { user } = useUser(email);
  const { roles } = useRoles(!email);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState();
  const [prefError, setPrefError] = useState(false);
  const {
    handleImageUpload: handleUserImageUpload,
    imageFile: userImageFile,
    imageFileerror: userImageFileError,
    changeImageFileError: changeUserFileError,
  } = useImage();
  const {
    handleImageUpload: handleNationalIdImage,
    imageFile: nationalIdFile,
    imageFileerror: nationalIdFileError,
    changeImageFileError: changeNationalIdFileError,
  } = useImage();
  const { pref } = usePreferences();
  let form_data = new FormData();
  const handleFormSubmit = async (values) => {
    setLoading(true);
    if (email) {
      try {
        const updateServer = await authFetch.patch(
          `/user/verify/${user.id}?verifyQuery=${verified ? 0 : 1}`
        );
        if (updateServer.status !== 200) return;
        setVerified(!verified);
      } catch (error) {
        setServerErrors(error.response.data.error);
      }
    } else {
      setServerErrors("");
      try {
        if (!userImageFile || userImageFileError) {
          changeUserFileError("User Image is required");
          return;
        }
        if (!nationalIdFile || nationalIdFileError) {
          changeNationalIdFileError("User national id image is required");
          return;
        }
        const {
          first_name,
          last_name,
          email,
          address,
          phone,
          role,
          password,
          confirmPassword,
          preferences,
        } = values;
        if (preferences.length === 0) {
          setPrefError(true);
          return;
        }
        form_data.append("first_name", first_name);
        form_data.append("last_name", last_name);
        form_data.append("email", email);
        form_data.append("address", address);
        form_data.append("phone", phone);
        form_data.append("role", role);
        form_data.append("password", password);
        form_data.append("confirmPassword", confirmPassword);
        form_data.append("preferences", preferences);
        form_data.append("image", userImageFile);
        form_data.append("nationalIdImage", nationalIdFile);
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/register`,
          form_data
        );
        if (res.statusText !== "OK") return;
        toast("User Created Successfully!");
      } catch (error) {
        setServerErrors(error.response.data.error);
      }
    }
    setLoading(false);
  };
  const initialValues = {
    first_name: user.first_name ? user.first_name : "",
    last_name: user.last_name ? user.last_name : "",
    email: user.email ? user.email : "",
    address: user.address ? user.address : "",
    phone: user.phone ? user.phone : "",
    role: "",
    password: "",
    confirmPassword: "",
    preferences: [],
  };
  const formValidation = yup.object().shape({
    first_name: !email && yup.string().required("first name is required"),
    last_name: !email && yup.string().required("last name is required"),
    email: !email && yup.string().email().required("enter a valid email"),
    address: !email && yup.string().required("address is required"),
    phone: !email && yup.string().length(11).required("enter a valid number"),
    role: !email && yup.string().required("role  is required"),
    password: !email && yup.string().required("password  is required"),
    confirmPassword:
      !email &&
      yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
  });

  useEffect(() => {
    if (user) {
      setVerified(user.verified);
    }
  }, [user]);

  console.log(user);
  return (
    <CustomContainer
      title={`BOGO  ${user?.roles?.role === "admin" ? "Team" : "Users"}`}
      subtitle={email ? "Viewing bogo user!" : "Adding new bogo user!"}
      onClick={() =>
        handleTitleClick(
          navigate,
          user?.roles?.role === "admin" ? "Team" : "Users"
        )
      }
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
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

            {!email && (
              <>
                <CustomTextField
                  type={"password"}
                  name="password"
                  label={"Password"}
                  errors={errors.password}
                  touched={touched.password}
                />

                <CustomTextField
                  type={"password"}
                  name="confirmPassword"
                  label={"Confirm Password"}
                  errors={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />

                <CustomTextField
                  type={"text"}
                  name="role"
                  label={"User Role"}
                  touched={touched.role}
                  errors={errors.role}
                  select={true}
                >
                  <MenuItem></MenuItem>
                  {roles?.map((item) => (
                    <MenuItem key={item.role} value={item.role}>
                      {item.role}
                    </MenuItem>
                  ))}
                </CustomTextField>
                <CustomSelect
                  name="preferences"
                  label={"User Preferences"}
                  value={values.preferences}
                  onChange={handleChange}
                  error={prefError}
                  editable="true"
                >
                  {pref?.map((item) => (
                    <MenuItem key={item.id} value={item?.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </>
            )}

            <ImageFileUpload
              image={email && user?.image}
              label={"User Image"}
              add={!email}
              handleImageUpload={(e) => handleUserImageUpload(e)}
              imageFileerror={!email && userImageFileError}
            />
            {!email && <ImageFileDisplay imageFile={userImageFile} />}
            <ImageFileUpload
              image={email && user?.nationalIdImage}
              label={"User National Id Image"}
              add={!email}
              handleImageUpload={(e) => handleNationalIdImage(e)}
              imageFileerror={!email && nationalIdFileError}
            />
            {!email && <ImageFileDisplay imageFile={nationalIdFile} />}

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
