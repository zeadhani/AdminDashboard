import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItem, useTheme } from "@mui/material";
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
import AddAttributes from "../../components/Forms/addAttributes";
import { checkCount, handleImageUpload } from "../../utils/functions";
import CustomContainer from "../global/CustomContainer";

function AddProduct() {
  const theme = useTheme();

  const navigate = useNavigate();
  let form_data = new FormData();
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState([]);
  const [imageFile, setimageFile] = useState();
  const [imageFileerror, setimageFileerror] = useState("");
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allattributes, setallattributes] = useState([]);
  const [attributesData, setattributesData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [indexcount, setindexcount] = useState();

  // const checkCount = (items) => {
  //   let result = { check: false, index: null };
  //   for (var i = 0; i < items.length; i++) {
  //     if (items[i].count === "" || items[i].count === null) {
  //       result.check = true;
  //       result.index = i;
  //       break;
  //     }
  //   }
  //   return result;
  // };
  // const handleImageUpload = (e) => {
  //   setimageFileerror("");
  //   setimageFile(null);
  //   const file = e.target.files[0];

  //   if (!SUPPORTED_FORMATS.find((type) => type === file.type)) {
  //     setimageFileerror("Not Supported file type");
  //     return;
  //   }
  //   setimageFile(file);
  // };

  const handleFormSubmit = async (values) => {
    setServerErrors("");
    if (!imageFile || imageFileerror) {
      setimageFileerror("Image is required");
      return;
    }
    let result = checkCount(attributesData);
    if (attributesData.length === 0) {
      setServerErrors("You have to add at least one attribute");
      return;
    } else if (result.check) {
      setServerErrors("Fill the count field at row " + (result.index + 1));
      setindexcount(result.index);
      return;
    }
    setLoading(true);
    const { name, price, category, gender, brand } = values;

    form_data.append("name", name);
    form_data.append("price", price);
    form_data.append("category", category);
    form_data.append("gender", gender);
    form_data.append("brand", brand);
    form_data.append("image", imageFile);

    try {
      // setServerErrors("");
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/products`,
        form_data
      );
      if (res.statusText !== "OK") return;

      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/${res.data.createdProduct.name}/additem`,
        attributesData
      );
      if (result.statusText === "OK") toast("Product added successfully");
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  const handleChangeattribute = (value, index, itemkey) => {
    setindexcount(null);
    setServerErrors("");
    let newarray = attributesData;
    let targetObject = newarray.at(index);
    targetObject[itemkey] = value;
    setattributesData(newarray);
  };

  useEffect(() => {
    const getFilteredData = async () => {
      const brandsData = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/filter/all`
      );
      setCategories(brandsData.data.categories);
      setGender(brandsData.data.gender);
      setallattributes(brandsData.data.attributes);
      setBrands(brandsData.data.brands);
    };
    setLoading(true);
    getFilteredData();
    setLoading(false);
  }, []);

  const formValidation = yup.object().shape({
    name: yup.string().required("name is required"),
    price: yup.number().integer().min(1).required("price is required"),
    category: yup.string().ensure().required("category is required!"),
    gender: yup.string().ensure().required("gender is required!"),
    brand: yup.string().ensure().required("brand is required!"),
  });
  const initialValues = {
    name: "",
    price: 0,
    category: "",
    gender: "",
    brand: "",
  };

  return (
    <CustomContainer
      title={"BOGO PRODUCTS"}
      subtitle={"Add new bogo product!"}
      onClick={() => navigate("/Products")}
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
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>
            <CustomTextField
              type={"text"}
              name="gender"
              label={"Product Gender"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.gender}
              touched={touched.gender}
              errors={errors.gender}
              select
            >
              {gender.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomTextField
              type={"text"}
              name="brand"
              label={"Product Brand"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.brand}
              touched={touched.brand}
              errors={errors.brand}
              select
            >
              {brands.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <ImageFileUpload
              add={true}
              handleImageUpload={(e) =>
                handleImageUpload(e, setimageFile, setimageFileerror)
              }
              imageFileerror={imageFileerror}
              label={"product Image"}
            />
            {imageFile && (
              <img
                alt="Choosen img"
                width={80}
                style={{ borderRadius: 5 }}
                src={URL.createObjectURL(imageFile)}
              />
            )}

            {/* {attributesData.map((item, index) => (
              <Stack key={item} direction={"row"} spacing={2}>
                {Object.keys(item).map((itemkey) => (
                  <TextField
                    key={itemkey}
                    label={itemkey}
                    error={itemkey === "count" && index === indexcount}
                    onChange={(e) =>
                      handleChangeattribute(e.target.value, index, itemkey)
                    }
                  />
                ))}
              </Stack>
            ))} */}

            <AddAttributes
              attributesData={attributesData}
              handleChangeattribute={handleChangeattribute}
              indexcount={indexcount}
              allattributes={allattributes}
              setattributesData={setattributesData}
            />

            {/* <Stack direction={"row"} spacing={2} justifyContent={"center"}>
            <Button
              disableRipple
              onClick={() => {
                let newarray = [...attributesData];
                let obj = {};
                allattributes.map((item) => {
                  obj[item.name] = null;
                });
                obj["count"] = null;
                newarray.push(obj);
                setattributesData(newarray);
              }}
              sx={{
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              color="info"
            >
              Add attribute
            </Button>
            {attributesData.length > 0 && (
              <Button
                disableRipple
                onClick={() => {
                  let newarray = [...attributesData];
                  newarray.pop();
                  setattributesData(newarray);
                }}
                sx={{
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
                color="error"
              >
                Remove
              </Button>
            )}
          </Stack> */}

            <FormButton theme={theme}>Create new product</FormButton>
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default AddProduct;
