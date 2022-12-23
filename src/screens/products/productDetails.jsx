import { Box, MenuItem, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import FormCard from "../../components/Forms/FormCard";
import CustomTextField from "../../components/Forms/CustomTextField";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import FormButton from "../../components/Forms/FormButton";
import axios from "axios";
import { toast } from "react-toastify";

const SUPPORTED_FORMATS = ["image/jpg", "image/png", "image/jpeg"];
function ProductDetails() {
  const { name } = useParams();
  const { state } = useLocation();
  const { editable } = state;
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const [product, setProduct] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFile, setimageFile] = useState();
  const [serverErrors, setServerErrors] = useState(null);
  const [imageFileerror, setimageFileerror] = useState("");
  let form_data = new FormData();

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
    if (add) {
      if (!imageFile || imageFileerror) {
        setimageFileerror("Image is required");
        return;
      }
    }
    setLoading(true);
    const { name, price, category } = values;
    if (imageFile) {
      form_data.append("image", imageFile);
    }
    form_data.append("name", name);
    form_data.append("price", price);
    form_data.append("categoryId", category);
    console.log(form_data);
    try {
      setServerErrors("");
      const res = await axios.patch(
        `http://localhost:3001/products/${product.id}`,
        form_data
      );
      if (res.statusText == "OK") toast("product Edited!");
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };

  const formValidation = yup.object().shape({
    name: yup.string().required("name is required"),
    price: yup.number().integer().min(1).required("price is required"),
    category: yup.string().ensure().required("category is required!"),
  });
  const getProduct = async () => {
    setLoading(true);
    try {
      const product = await axios.get(`http://localhost:3001/products/${name}`);
      setProduct(product.data);
      if (editable) {
        const categoriesdata = await axios.get(
          `http://localhost:3001/category`
        );
        setCategories(categoriesdata.data);
      }
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProduct();
  }, []);
  const initialValues = {
    name: product ? product.name : "",
    price: product ? product.price : 0,
    category: product ? product.categoryId : "",
  };
  return (
    <Box mx="20px">
      <Header
        title={"BOGO PRODUCTS"}
        subtitle={
          editable ? "Editing your bogo product!" : "Viewing your bogo product!"
        }
      />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
        enableReinitialize={true}
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
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
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
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
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
              select={editable}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
            >
              {categories.map((item) => (
                <MenuItem key={item.id} value={item?.id}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <ImageFileUpload
              add={add}
              editable={editable}
              triggerAdd={() => {
                setAdd((prev) => !prev);
                if (!add) {
                  setimageFile("");
                  setimageFileerror("");
                }
              }}
              image={product?.image}
              handleImageUpload={handleImageUpload}
              imageFileerror={imageFileerror}
              label={"product Image"}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
            />
            {imageFile && add && (
              <img
                width={80}
                style={{ borderRadius: 5 }}
                src={URL.createObjectURL(imageFile)}
              />
            )}
            {editable && <FormButton theme={theme}>Save</FormButton>}
          </FormCard>
        )}
      </Formik>
    </Box>
  );
}

export default ProductDetails;
