import React from "react";
import useSetting from "../../components/hooks/setting/useSetting";
import CustomContainer from "../global/CustomContainer";
import { useNavigate } from "react-router-dom";
import { handleTitleClick } from "../../utils/functions";
import * as yup from "yup";
import FormButton from "../../components/Forms/FormButton";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import ImageFileDisplay from "../../components/Forms/imageFileDisplay";
import CustomTextField from "../../components/Forms/CustomTextField";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { Formik } from "formik";
import FormCard from "../../components/Forms/FormCard";
import useImage from "../../components/hooks/general/useImage";
import authFetch from "../../services/interceptors";
import { toast } from "react-toastify";
function BogoDataEdit() {
  const { setting } = useSetting();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [add, setAdd] = useState();
  let form_data = new FormData();
  const handleFormSubmit = async (values) => {
    setServerErrors("");
    if (add) {
      if (!imageFile || imageFileerror) {
        changeImageFileError("Image is required");
        return;
      }
    }
    const {
      email,
      phone,
      phone2,
      twitter,
      facebook,
      instagram,
      tiktok,
      linkedIn,
    } = values;

    setLoading(true);

    form_data.append("email", email);
    form_data.append("phone", phone);
    form_data.append("phone2", phone2);
    form_data.append("linkedIn", linkedIn);
    form_data.append("twitter", twitter);
    form_data.append("facebook", facebook);
    form_data.append("instagram", instagram);
    form_data.append("tiktok", tiktok);

    if (imageFile) {
      form_data.append("image", imageFile);
    }

    try {
      const res = await authFetch.patch(`/setting`, form_data);
      if (res.statusText !== "OK") return;
      toast("Settings edited successfully");
    } catch (error) {
      setServerErrors(error.response.data.error);
    }
    setLoading(false);
  };
  const {
    handleImageUpload,
    imageFile,
    imageFileerror,
    resetImageFile,
    changeImageFileError,
  } = useImage();
  const formValidation = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    phone: yup.string().length(11).required("enter a valid number"),
    phone2: yup.string().length(11).required("enter a valid number"),
    twitter: yup.string().required("Link is required"),
    facebook: yup.string().required("Link is required"),
    instagram: yup.string().required("Link is required"),
    tiktok: yup.string().required("Link is required"),
    linkedIn: yup.string().required("Link is required"),
  });

  const initialValues = {
    email: setting ? setting.email : "",
    phone: setting ? setting.phone : "",
    phone2: setting ? setting.phone2 : "",
    twitter: setting ? setting.twitter : "",
    facebook: setting ? setting.facebook : "",
    instagram: setting ? setting.instagram : "",
    tiktok: setting ? setting.tiktok : "",
    linkedIn: setting ? setting.linkedIn : "",
  };
  return (
    <CustomContainer
      title={"Bogo settings"}
      subtitle={"editing settings"}
      onClick={() => handleTitleClick(navigate, "Setting")}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
        enableReinitialize={true}
      >
        {({ errors, touched, handleSubmit }) => (
          <FormCard
            serverErrors={serverErrors}
            loading={loading}
            handleSubmit={handleSubmit}
          >
            <CustomTextField
              type={"text"}
              name="email"
              label={"Bogo Email"}
              touched={touched.email}
              errors={errors.email}
            />
            <CustomTextField
              type={"text"}
              name="phone"
              label={"Phone"}
              touched={touched.phone}
              errors={errors.phone}
            />
            <CustomTextField
              type={"text"}
              name="phone2"
              label={"Phone2"}
              touched={touched.phone2}
              errors={errors.phone2}
            />
            <CustomTextField
              type={"text"}
              name="facebook"
              label={"Facebook Link"}
              touched={touched.facebook}
              errors={errors.facebook}
            />
            <CustomTextField
              type={"text"}
              name="instagram"
              label={"Instargam"}
              touched={touched.instagram}
              errors={errors.instagram}
            />
            <CustomTextField
              type={"text"}
              name="twitter"
              label={"Twitter Link"}
              touched={touched.twitter}
              errors={errors.tiktok}
            />
            <CustomTextField
              type={"text"}
              name="linkedIn"
              label={"LinkedIn Link"}
              touched={touched.linkedIn}
              errors={errors.linkedIn}
            />
            <CustomTextField
              type={"text"}
              name="tiktok"
              label={"Tiktok Link"}
              touched={touched.tiktok}
              errors={errors.tiktok}
            />
            <ImageFileUpload
              add={add}
              editable={true}
              setAdd={setAdd}
              resetImageFile={resetImageFile}
              image={setting?.image}
              handleImageUpload={(e) => handleImageUpload(e)}
              imageFileerror={imageFileerror}
              label={"BOGO LOGO"}
              variant={"filled"}
            />
            {add && <ImageFileDisplay imageFile={imageFile} />}
            <FormButton theme={theme}>Save</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default BogoDataEdit;
