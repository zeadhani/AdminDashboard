import { MenuItem, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomContainer from "../global/CustomContainer";
import { Formik } from "formik";
import * as yup from "yup";
import { handleTitleClick } from "../../utils/functions";
import FormCard from "../../components/Forms/FormCard";
import FormButton from "../../components/Forms/FormButton";
import CustomTextField from "../../components/Forms/CustomTextField";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import axios from "axios";
import CustomSelect from "../../components/Forms/CustomSelect";
import { toast } from "react-toastify";
import CustomDateSelector from "../../components/Forms/CustomDateSelector";
import useBrandData from "../../components/hooks/merchants/useBrandData";
import useImage from "../../components/hooks/general/useImage";
import ImageFileDisplay from "../../components/Forms/imageFileDisplay";

const initialValues = {
  name: "",
  email: "",
  prefrence: "",
  categories: [],
};
function AddBrand() {
  const theme = useTheme();

  const navigate = useNavigate();
  let form_data = new FormData();

  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categories, pref } = useBrandData();
  const { handleImageUpload, imageFile, imageFileerror, changeImageFileError } =
    useImage();
  const [dateValue, setDateValue] = useState();
  const [brandError, setBrandError] = useState(false);

  const handleFormSubmit = async (values) => {
    setServerErrors("");
    if (values.categories.length === 0) {
      setBrandError(true);
      return;
    }
    if (dateValue === undefined || new Date(dateValue) <= new Date()) {
      setServerErrors("Please Enter Valid Date");
      return;
    }
    if (!imageFile || imageFileerror) {
      changeImageFileError("Image is required");
      return;
    }
    const { name, email, prefrence, categories } = values;

    setLoading(true);
    form_data.append("name", name);
    form_data.append("email", email);
    form_data.append("prefrence", prefrence);
    form_data.append("categories", categories);
    form_data.append("image", imageFile);
    form_data.append("contrat_Expire", new Date(dateValue).toISOString());
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/brand`,
        form_data
      );
      if (res.statusText !== "OK") return;
      toast("Product added successfully");
    } catch (error) {
      setServerErrors(error.response.data.error);
    }
    setLoading(false);
  };

  const formValidation = yup.object().shape({
    name: yup.string().required("Brand Name is required"),
    email: yup.string().required("Brand Email is required"),
    prefrence: yup.string().ensure().required("Prefrence is required!"),
  });

  return (
    <CustomContainer
      title={"BOGO MERCHANTS"}
      subtitle={"Add new bogo merchant!"}
      onClick={() => handleTitleClick(navigate, "Merchants")}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <FormCard
            serverErrors={serverErrors}
            loading={loading}
            handleSubmit={handleSubmit}
          >
            <CustomTextField
              type={"text"}
              name="name"
              label={"Brand Name"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.name}
              touched={touched.name}
              errors={errors.name}
            />
            <CustomTextField
              type={"text"}
              name="email"
              label={"Brand Email"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.email}
              touched={touched.email}
              errors={errors.email}
            />
            <CustomTextField
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
              {pref?.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomSelect
              label={"Product Categories"}
              value={values.categories}
              onChange={handleChange}
              error={brandError}
              name="categories"
            >
              {categories?.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomSelect>

            <CustomDateSelector
              dateValue={dateValue}
              setDateValue={setDateValue}
            />
            <ImageFileUpload
              add={true}
              handleImageUpload={(e) => handleImageUpload(e)}
              imageFileerror={imageFileerror}
              label={"Brand Image"}
            />
            <ImageFileDisplay imageFile={imageFile} />

            <FormButton theme={theme}>Create new brand</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default AddBrand;
