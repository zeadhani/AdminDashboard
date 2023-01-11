import { MenuItem, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomContainer from "../global/CustomContainer";
import { Formik } from "formik";
import * as yup from "yup";
import { handleImageUpload, handleTitleClick } from "../../utils/functions";
import FormCard from "../../components/Forms/FormCard";
import FormButton from "../../components/Forms/FormButton";
import CustomTextField from "../../components/Forms/CustomTextField";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
function AddBrand() {
  const theme = useTheme();

  const navigate = useNavigate();
  let form_data = new FormData();

  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageFile, setimageFile] = useState();
  const [dateValue, setDateValue] = useState();
  const [imageFileerror, setimageFileerror] = useState("");

  useEffect(() => {
    const getPref = async () => {
      const prefData = await axios.get(`${process.env.REACT_APP_API_URL}/pref`);
      setPreferences(prefData.data);
    };
    setLoading(true);
    getPref();
    setLoading(false);
  }, []);
  const handleFormSubmit = async (values) => {
    console.log(values);
  };
  const formValidation = yup.object().shape({
    name: yup.string().required("Brand Name is required"),
    email: yup.string().required("Brand Email is required"),
    Contract_date: yup
      .string()
      .required("Brand Contract Exppire date is required"),
  });
  const initialValues = {
    name: "",
    email: "",
    prefrence: "",
    categories: [],
  };
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
              name="name"
              label={"Brand Email"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.email}
              touched={touched.email}
              errors={errors.email}
            />
            <CustomTextField
              type={"text"}
              name="category"
              label={"Product Preference"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.prefrence}
              touched={touched.prefrence}
              errors={errors.prefrence}
              select
            >
              {preferences?.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomTextField
              type={"text"}
              name="category"
              label={"Product Categories"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.prefrence}
              touched={touched.prefrence}
              errors={errors.prefrence}
              select
            >
              {preferences?.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Contract Expire Date"
                inputFormat="YYYY/MM/DD"
                value={dateValue}
                onChange={(value) => setDateValue(value)}
                renderInput={(params) => <CustomTextField {...params} />}
              />
            </LocalizationProvider>

            <ImageFileUpload
              add={true}
              handleImageUpload={(e) =>
                handleImageUpload(e, setimageFile, setimageFileerror)
              }
              imageFileerror={imageFileerror}
              label={"Brand Image"}
            />
            {imageFile && (
              <img
                alt="Choosen img"
                width={80}
                style={{ borderRadius: 5 }}
                src={URL.createObjectURL(imageFile)}
              />
            )}

            <FormButton theme={theme}>Create new brand</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default AddBrand;
