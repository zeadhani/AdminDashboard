import { Box, MenuItem, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import FormCard from "../../components/Forms/FormCard";
import CustomTextField from "../../components/Forms/CustomTextField";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import FormButton from "../../components/Forms/FormButton";
import axios from "axios";
import { toast } from "react-toastify";
import CustomAccordion from "../../components/products/CustomAccordion";
import { useNavigate } from "react-router-dom";
import AddAttributes from "../../components/Forms/addAttributes";
import { checkCount, handleImageUpload, sendAttr } from "../../utils/functions";
import CustomContainer from "../global/CustomContainer";

function ProductDetails() {
  const { name } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { editable } = state;
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const [product, setProduct] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gender, setGender] = useState([]);
  const [imageFile, setimageFile] = useState();
  const [serverErrors, setServerErrors] = useState(null);
  const [imageFileerror, setimageFileerror] = useState("");
  const [allattributes, setallattributes] = useState([]);
  const [attributesData, setattributesData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [indexcount, setindexcount] = useState();
  let form_data = new FormData();
  const [expanded, setExpanded] = React.useState();
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
  const handleChangeattribute = (value, index, itemkey) => {
    setindexcount(null);
    setServerErrors("");
    let newarray = attributesData;
    let targetObject = newarray.at(index);
    targetObject[itemkey] = value;
    setattributesData(newarray);
  };

  const handleChangeExpansion = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
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

  // const sendAttr = (item) => {
  //   let attr = {};
  //   item.ProductAttributesValues.map((single) => {
  //     attr[single.attribute.name] = single.value;
  //   });

  //   return attr;
  // };

  const handleFormSubmit = async (values) => {
    if (!editable) return;
    if (add) {
      if (!imageFile || imageFileerror) {
        setimageFileerror("Image is required");
        return;
      }
    }
    let result = checkCount(attributesData);

    if (result.check) {
      setServerErrors("Fill the count field at row " + (result.index + 1));
      setindexcount(result.index);
      return;
    }
    setLoading(true);
    const { name, price, category, gender, brand } = values;
    if (imageFile) {
      form_data.append("image", imageFile);
    }
    form_data.append("name", name);
    form_data.append("price", price);
    form_data.append("category", category);
    form_data.append("gender", gender);
    form_data.append("brand", brand);
    try {
      setServerErrors("");
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/products/${product.id}`,
        form_data
      );
      if (res.statusText !== "OK") return;

      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/${res.data.editedProduct.name}/additem`,
        attributesData
      );
      if (result.statusText === "OK") {
        toast("Product edited successfully");
        getProduct();
      }
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  const formValidation = yup.object().shape({
    name: yup.string().required("name is required"),
    price: yup.number().integer().min(1).required("price is required"),
    category: yup.string().ensure().required("category is required!"),
    gender: yup.string().ensure().required("gender is required!"),
    brand: yup.string().ensure().required("brand is required!"),
  });
  const getProduct = async () => {
    setLoading(true);
    try {
      const product = await axios.get(
        `${process.env.REACT_APP_API_URL}/products/${name}`
      );
      setProduct(product.data);
      setItems(product.data.productItems);
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  // const getattributes = async () => {
  //   const attributesdata = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/attribute`
  //   );
  //   setallattributes(attributesdata.data);
  // };
  const getFilteredData = async () => {
    const brandsData = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/filter/all`
    );
    setCategories(brandsData.data.categories);
    setGender(brandsData.data.gender);
    setallattributes(brandsData.data.attributes);
    setBrands(brandsData.data.brands);
  };
  useEffect(() => {
    getProduct();
    // getattributes();
    getFilteredData();
  }, []);

  async function handleDelete(name) {
    try {
      const deleteItem = await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${product.name}/item/${name}`
      );

      if (deleteItem.status === 200) {
        const newArray = [...items];
        const resullt = newArray.filter((item) => item.name !== name);
        setItems(resullt);
      }
    } catch (err) {
      setServerErrors(err);
    }
  }

  const initialValues = {
    name: product ? product.name : "",
    price: product ? product.price : 0,
    category: product ? product.Category.name : "",
    gender: product ? product.Gender.name : "",
    brand: product ? product.Brands.name : "",
  };

  return (
    <CustomContainer
      title={"BOGO PRODUCTS"}
      subtitle={
        editable ? "Editing your bogo product!" : "Viewing your bogo product!"
      }
      onClick={() => navigate("/Products")}
    >
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
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <CustomTextField
              type={"text"}
              name="gender"
              label={"Product gender"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values.gender}
              touched={touched.gender}
              errors={errors.gender}
              select={editable}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
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
              select={editable}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
            >
              {brands.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
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
              handleImageUpload={(e) =>
                handleImageUpload(e, setimageFile, setimageFileerror)
              }
              imageFileerror={imageFileerror}
              label={"product Image"}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
            />
            {imageFile && add && (
              <img
                alt={`${values.name}`}
                width={80}
                style={{ borderRadius: 5 }}
                src={URL.createObjectURL(imageFile)}
              />
            )}

            <Box>
              {items?.map((item) => (
                <CustomAccordion
                  getProduct={getProduct}
                  name={item.name}
                  handleChange={handleChangeExpansion}
                  expanded={expanded}
                  count={item.count}
                  attr={sendAttr(item)}
                  editable={editable}
                  deleteItem={handleDelete}
                  key={item.name}
                  title={product.name}
                />
              ))}
            </Box>
            {editable && (
              <AddAttributes
                attributesData={attributesData}
                handleChangeattribute={handleChangeattribute}
                indexcount={indexcount}
                allattributes={allattributes}
                setattributesData={setattributesData}
              />
            )}

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
            {editable && <FormButton theme={theme}>Save</FormButton>}
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default ProductDetails;
