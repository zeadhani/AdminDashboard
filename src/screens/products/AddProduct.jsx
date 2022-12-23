import React, { useEffect } from "react";
import Header from "../../components/Header";
import { Box, MenuItem, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormButton from "../../components/Forms/FormButton";
import CustomTextField from "../../components/Forms/CustomTextField";
import FormCard from "../../components/Forms/FormCard";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
function AddProduct() {
  const theme = useTheme();
  let form_data = new FormData();
  const [categories, setCategories] = useState([]);
  const [imageFile, setimageFile] = useState();
  const [imageFileerror, setimageFileerror] = useState("");
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setimageFileerror("");
    setimageFile(null);
    const file = e.target.files[0];

    if (!SUPPORTED_FORMATS.find((type) => type === file.type)) {
      setimageFileerror("Not Supported file type");
      return;
    }
    setimageFile(file);
  };

  const handleFormSubmit = async (values) => {
    if (!imageFile || imageFileerror) {
      setimageFileerror("Image is required");
      return;
    }
    setLoading(true);
    const { name, price, category } = values;

    form_data.append("name", name);
    form_data.append("price", price);
    form_data.append("categoryId", category);
    form_data.append("image", imageFile);

    try {
      setServerErrors("");
      const res = await axios.post(`http://localhost:3001/products`, form_data);
      if (res.statusText == "OK") toast("product Added!");
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoriesdata = await axios.get(`http://localhost:3001/category`);
      setCategories(categoriesdata.data);
    };
    getCategories();
  }, []);

  const formValidation = yup.object().shape({
    name: yup.string().required("name is required"),
    price: yup.number().integer().min(1).required("price is required"),
    category: yup.string().ensure().required("category is required!"),
  });
  const initialValues = {
    name: "",
    price: 0,
    category: "",
  };

  return (
    <Box mx="20px">
      <Header title={"BOGO PRODUCTS"} subtitle={"Add new bogo product!"} />
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
              label={"product Name"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.name}
              touched={touched.name}
              errors={errors.name}
            />
            <CustomTextField
              type={"text"}
              name="price"
              label={"Product price"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.price}
              touched={touched.price}
              errors={errors.price}
            />
            <CustomTextField
              type={"text"}
              name="category"
              label={"Product Category"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.category}
              touched={touched.category}
              errors={errors.category}
              select
            >
              {categories.map((item) => (
                <MenuItem key={item.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <ImageFileUpload
              add={true}
              handleImageUpload={handleImageUpload}
              imageFileerror={imageFileerror}
              label={"product Image"}
            />
            {imageFile && (
              <img
                width={80}
                style={{ borderRadius: 5 }}
                src={URL.createObjectURL(imageFile)}
              />
            )}
            <FormButton theme={theme}>Create new product</FormButton>
          </FormCard>
        )}
      </Formik>
    </Box>
  );
}

export default AddProduct;
