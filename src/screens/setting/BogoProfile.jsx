import React from "react";
import useuser from "../../components/hooks/auth/useUser";
import CustomContainer from "../../screens/global/CustomContainer";
import { Formik } from "formik";
import FormButton from "../../components/Forms/FormButton";
import CustomTextField from "../../components/Forms/CustomTextField";
import FormCard from "../../components/Forms/FormCard";
import { useState } from "react";
import { useTheme } from "@mui/system";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { MenuItem, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../components/Forms/CustomSelect";

import usePreferences from "../../components/hooks/merchants/usepreferences";
import useImage from "../../components/hooks/general/useImage";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import ImageFileDisplay from "../../components/Forms/imageFileDisplay";
import authFetch from "../../services/interceptors";
import { toast } from "react-toastify";
import { handleTitleClick } from "../../utils/functions";
function BogoProfile() {
  const data = useSelector((state) => state.Auth.user);
  const email = data.replace(/"/g, "");
  const { user } = useuser(email);
  const { pref } = usePreferences();
  const [prefrror, setPrefError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState();
  const [nationalIdAdd, setNationalIdAdd] = useState();
  const [serverErrors, setServerErrors] = useState("");
  const theme = useTheme();
  let form_data = new FormData();
  const {
    handleImageUpload: handleUserImageUpload,
    imageFile: userImageFile,
    imageFileerror: userImageFileError,
    changeImageFileError: changeUserFileError,
    resetImageFile: resetUserProfile,
  } = useImage();
  const {
    handleImageUpload: handleNationalIdImage,
    imageFile: nationalIdFile,
    imageFileerror: nationalIdFileError,
    changeImageFileError: changeNationalIdFileError,
    resetImageFile: resetNationalDFile,
  } = useImage();
  const handleFormSubmit = async (values) => {
    if (!user.first_name) return;
    setServerErrors("");
    if (values.preferences.length === 0) {
      setPrefError(true);
      return;
    }
    if (add) {
      if (!userImageFile || userImageFileError) {
        changeUserFileError("Profile Image is required");
        return;
      }
    }
    if (nationalIdAdd) {
      if (!nationalIdFile || nationalIdFileError) {
        changeNationalIdFileError("National ID Image is required");
        return;
      }
    }

    const { first_name, last_name, phone, preferences, email, address } =
      values;

    setLoading(true);
    form_data.append("first_name", first_name);
    form_data.append("last_name", last_name);
    form_data.append("email", email);
    form_data.append("address", address);
    form_data.append("phone", phone);
    form_data.append("preferences", preferences);
    if (userImageFile) {
      form_data.append("image", userImageFile);
    }
    if (nationalIdFile) {
      form_data.append("nationalIdImage", nationalIdFile);
    }
    try {
      const res = await authFetch.patch(`/user/${user.id}`, form_data);
      if (res.statusText !== "OK") return;
      toast("Your Profile is Edited Successfully!");
    } catch (error) {
      setServerErrors(error.response.data.error);
    }
    setLoading(false)
  };
  const formValidation = yup.object().shape({
    first_name: yup.string().required("first name is required"),
    last_name: yup.string().required("last name is required"),
    email: yup.string().email().required("enter a valid email"),
    address: yup.string().required("address is required"),
    phone: yup.string().length(11).required("enter a valid number"),
  });
  const handleChangePassword = () => {
    navigate(`/setting/userData/changePassword`);
  };
  const initialValues = {
    first_name: user.first_name ? user.first_name : "",
    last_name: user.last_name ? user.last_name : "",
    email: user.email ? user.email : "",
    address: user.address ? user.address : "",
    phone: user.phone ? user.phone : "",
    preferences: user.preferences
      ? user.preferences.map((item) => item.Preferences.name)
      : [],
  };
  
  return (
    <CustomContainer
      title={"Bogo Setings"}
      subtitle={"editing your bogo profile"}
      onClick={() => handleTitleClick(navigate, "Setting")}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <FormCard
            serverErrors={serverErrors}
            loading={loading}
            handleSubmit={handleSubmit}
          >
            <CustomTextField
              type={"text"}
              name="first_name"
              label={"First Name"}
              touched={touched.first_name}
              errors={errors.first_name}
            />
            <CustomTextField
              type={"text"}
              name="last_name"
              label={"Last Name"}
              touched={touched.last_name}
              errors={errors.last_name}
            />
            <CustomTextField
              type={"text"}
              name="email"
              label={"Email"}
              touched={touched.email}
              errors={errors.email}
            />
            <CustomTextField
              type={"text"}
              name="address"
              label={"Email"}
              touched={touched.address}
              errors={errors.address}
            />
            <CustomTextField
              type={"text"}
              name="phone"
              label={"Mobile Number"}
              touched={touched.phone}
              errors={errors.phone}
            />
            <CustomSelect
              label={"Your Preferences"}
              value={values.preferences}
              onChange={handleChange}
              editable={"true"}
              error={prefrror}
              name="preferences"
            >
              {pref?.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomSelect>
            <ImageFileUpload
              image={user?.image}
              label={"Profile Image"}
              add={add}
              editable={true}
              setAdd={setAdd}
              resetImageFile={resetUserProfile}
              handleImageUpload={(e) => handleUserImageUpload(e)}
              imageFileerror={userImageFileError}
            />
            {add && <ImageFileDisplay imageFile={userImageFile} />}
            <ImageFileUpload
              image={user?.nationalIdImage}
              label={"National Id Image"}
              handleImageUpload={(e) => handleNationalIdImage(e)}
              imageFileerror={nationalIdFileError}
              add={nationalIdAdd}
              editable={true}
              setAdd={setNationalIdAdd}
              resetImageFile={resetNationalDFile}
            />
            {<ImageFileDisplay imageFile={nationalIdFile} />}
            <Typography
              onClick={handleChangePassword}
              sx={{ cursor: "pointer" }}
            >
              Change Password &rarr;
            </Typography>
            <FormButton theme={theme}>Save</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default BogoProfile;
