import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import LinearProg from "../../components/LinearProg";
import { ToastContainer } from "react-toastify";
import FormButton from "../../components/Forms/FormButton";
function ProductDetails() {
  const { name } = useParams();
  const { state } = useLocation();
  const { editable } = state;
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFile, setimageFile] = useState();
  const [imageFileerror, setimageFileerror] = useState("");
  let form_data = new FormData();

  const handleImageUpload = (e) => {};

  const handleFormSubmit = async (values) => {};

  const formValidation = yup.object().shape({
    name: yup.string().required("name is required"),
    price: yup.number().integer().min(1).required("price is required"),
    category: yup.string().ensure().required("category is required!"),
  });
  const initialValues = {
    name: "",
    price: "",
    category: "",
  };
  return (
    <>
      <Box mx="20px">
        <Header
          title={"BOGO PRODUCTS"}
          subtitle={
            editable
              ? "Editing your bogo product!"
              : "Viewing your bogo product!"
          }
        />
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
            <form
              onSubmit={handleSubmit}
              style={{ width: 700, margin: "auto", paddingTop: "20px" }}
            >
              <LinearProg loading={loading} />
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Product Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Product price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={!!touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />

                <TextField
                  select
                  variant="filled"
                  fullWidth
                  label="Product Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.id} value={item?.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
                <Stack direction={"row"} spacing={2}>
                  <Typography display={"flex"} alignItems={"center"}>
                    product Image
                  </Typography>
                  <TextField
                    sx={{ flex: 1 }}
                    variant="standard"
                    type="file"
                    onChange={handleImageUpload}
                    error={imageFileerror ? true : false}
                    helperText={imageFileerror}
                  />
                </Stack>
                {editable && <FormButton theme={theme}>Save</FormButton>}
              </Stack>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
}

export default ProductDetails;
