import React from "react";
import CustomContainer from "../global/CustomContainer";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import useImage from "../../components/hooks/general/useImage";
import { Formik } from "formik";
import FormCard from "../../components/Forms/FormCard";
import { useState } from "react";
import CustomTextField from "../../components/Forms/CustomTextField";
import * as yup from "yup";
import FormButton from "../../components/Forms/FormButton";
import { useTheme } from "@mui/material";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import useSingleSlider from "../../components/hooks/homeslider/useSingleSlider";
import { handleTitleClick } from "../../utils/functions";

function HomeSliderDetails() {
  const theme = useTheme();
  const [add, setAdd] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, serverErrors } = useSingleSlider({ id });
  const {
    handleImageUpload,
    imageFile,
    imageFileerror,
    changeImageFileError,
    resetImageFile,
  } = useImage();

  const handleFormSubmit = async (values) => {
    if (add) {
      if (!imageFile || imageFileerror) {
        changeImageFileError("Image is required");
        return;
      }
    }

    toast.success("good");
  };
  const formValidation = yup.object().shape({
    image: yup.string().required("Image title is required"),
    imageLink: yup.string().required("Image Link is required"),
    imageSubtitle: yup.string().required("Image subtitle is required"),
  });
  const initialValues = {
    image: data ? data.title : "",
    imageSubtitle: data ? data.subtitle : "",
    imageLink: data ? data.link : "",
  };

  return (
    <CustomContainer
      title={"bogo homeslider"}
      subtitle={"managing homeslider!"}
      onClick={() => handleTitleClick(navigate, "home-slider")}
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
              name="image"
              label={"Image Title"}
              errors={errors.image}
              touched={touched.image}
            />
            <CustomTextField
              type={"text"}
              name="imageSubtitle"
              label={"Image subtitle"}
              errors={errors.imageSubtitle}
              touched={touched.imageSubtitle}
            />
            <CustomTextField
              type={"text"}
              name="imageLink"
              label={"Image Link"}
              errors={errors.imageLink}
              touched={touched.imageLink}
            />
            <ImageFileUpload
              add={add}
              editable={true}
              setAdd={setAdd}
              resetImageFile={resetImageFile}
              image={data?.image}
              handleImageUpload={(e) => handleImageUpload(e)}
              imageFileerror={imageFileerror}
              label={"product Image"}
            />

            <FormButton theme={theme}>Save</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default HomeSliderDetails;
