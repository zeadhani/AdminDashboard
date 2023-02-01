import { Box, MenuItem, useTheme } from "@mui/material";
import React, { useRef, useState } from "react";
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
import { checkCount, handleTitleClick, sendAttr } from "../../utils/functions";
import CustomContainer from "../global/CustomContainer";
import useFilteredData from "../../components/hooks/products/useFilteredData";
import useSingleProduct from "../../components/hooks/products/useSingleProduct";
import useImage from "../../components/hooks/general/useImage";
import ImageFileDisplay from "../../components/Forms/imageFileDisplay";
import { useEffect } from "react";

function ProductDetails() {
  let { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { editable } = state;
  const theme = useTheme();
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const { brands, categories, gender, allattributes } = useFilteredData();
  const [offers, setOffers] = useState();
  const { items, product, getProduct, newItems } = useSingleProduct(
    setServerErrors,
    id,
    setLoading
  );

  const [add, setAdd] = useState(false);
  const {
    handleImageUpload,
    imageFile,
    imageFileerror,
    resetImageFile,
    changeImageFileError,
  } = useImage();

  const [attributesData, setattributesData] = useState([]);
  const [indexcount, setindexcount] = useState();
  let form_data = new FormData();
  const [expanded, setExpanded] = React.useState();

  const handleChangeattribute = (value, index, itemkey) => {
    setindexcount(null);
    setServerErrors("");
    let newarray = attributesData;
    let targetObject = newarray.at(index);
    targetObject[itemkey] = value;
    setattributesData(newarray);
  };

  const handleChangeExpansion = (panel) => (event, newExpanded) => {
    if (newExpanded) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
      setExpanded(panel);
    } else {
      setExpanded(false);
    }
  };
  const handleFormSubmit = async (values) => {
    if (!editable) return;
    if (add) {
      if (!imageFile || imageFileerror) {
        changeImageFileError("Image is required");
        return;
      }
    }

    const { name, price, category, gender, brand, count, offer } = values;
    if (imageFile) {
      form_data.append("image", imageFile);
    }
    if (!product.hasAttributes) {
      form_data.append("count", count);
    } else {
      let result = checkCount(attributesData);

      if (result.check) {
        setServerErrors("Fill the count field at row " + (result.index + 1));
        setindexcount(result.index);
        return;
      }
    }
    setLoading(true);
    form_data.append("name", name);
    form_data.append("price", price);
    form_data.append("category", category);
    form_data.append("gender", gender);
    form_data.append("brand", brand);
    form_data.append(
      "hasAttributes",
      product.hasAttributes === 1 ? true : false
    );
    form_data.append("offer", offer);
    try {
      setServerErrors("");
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/products/${product.id}`,
        form_data
      );
      if (res.statusText !== "OK") return;
      if (!product.hasAttributes) {
        toast("Product edited successfully");
        setLoading(false);
        return;
      }
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/${res.data.editedProduct.name}/additem`,
        attributesData
      );
      if (result.statusText === "OK") {
        toast("Product edited successfully");
        if (product.hasAttributes) {
          getProduct();
        }
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
    count: yup.number().integer().min(0).required("brand is required!"),
    offer: yup.string().ensure().required("offer is required!"),
  });

  async function handleDelete(name) {
    try {
      const deleteItem = await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/${product.name}/item/${name}`
      );
      if (deleteItem.status === 200) {
        const newArray = [...items];
        const resullt = newArray.filter((item) => item.name !== name);
        newItems(resullt);
      }
    } catch (err) {
      setServerErrors(err);
    }
  }
  const handleOffer = async (e, id) => {
    console.log(id);
    if (!id) return;
    try {
      const offersData = await axios.get(
        `${process.env.REACT_APP_API_URL}/offer/${id}`
      );
      setOffers(offersData.data);
    } catch (err) {
      setServerErrors(err);
    }
  };
  useEffect(() => {
    handleOffer("", product?.brandsId);
  }, [product]);

  const initialValues = {
    name: product ? product.name : "",
    price: product ? product.price : 0,
    category: product ? product.Category.name : "",
    gender: product ? product.Gender.name : "",
    brand: product ? product.Brands.name : "",
    count: product ? product.count : 0,
    offer: product ? product.offers?.name : "",
  };
  return (
    <CustomContainer
      title={"BOGO PRODUCTS"}
      subtitle={
        editable ? "Editing your bogo product!" : "Viewing your bogo product!"
      }
      onClick={() => handleTitleClick(navigate, "Products")}
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
              handleBlur={editable && handleBlur}
              handleChange={editable && handleChange}
              value={values.name}
              touched={touched.name}
              errors={errors.name}
              variant={editable ? "filled" : "standard"}
            />
            <CustomTextField
              type={"text"}
              name="price"
              label={"Product price"}
              handleBlur={editable && handleBlur}
              handleChange={editable && handleChange}
              value={values.price}
              touched={touched.price}
              errors={errors.price}
              variant={editable ? "filled" : "standard"}
            />
            <CustomTextField
              type={"text"}
              name="category"
              label={"Product Category"}
              handleBlur={editable && handleBlur}
              handleChange={editable && handleChange}
              value={values.category}
              touched={touched.category}
              errors={errors.category}
              select={editable}
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
              handleBlur={editable && handleBlur}
              handleChange={editable && handleChange}
              value={values.gender}
              touched={touched.gender}
              errors={errors.gender}
              select={editable}
              variant={editable ? "filled" : "standard"}
            >
              {gender.map((item) => (
                <MenuItem key={item.id} value={item?.name}>
                  {item.name}
                </MenuItem>
              ))}
            </CustomTextField>

            <Box display={"flex"} gap={1}>
              <CustomTextField
                type={"text"}
                name="brand"
                label={"Product Brand"}
                handleBlur={editable && handleBlur}
                handleChange={editable && handleChange}
                value={values.brand}
                touched={touched.brand}
                errors={errors.brand}
                select={editable}
                variant={editable ? "filled" : "standard"}
              >
                {brands.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item?.name}
                    onClick={(e) => {
                      handleOffer(e, item?.id);
                      if (!offers.length > 0) {
                        values.offer = "";
                      }
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </CustomTextField>

              <CustomTextField
                type={"text"}
                name="offer"
                label={
                  offers?.length === 0 ? "no available offers" : "choose offer"
                }
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={ values.offer }
                touched={offers?.length > 0 && touched.offer}
                errors={offers?.length > 0 && errors.offer}
                select={offers?.length}
              >
                {offers?.map((item) => (
                  <MenuItem key={item.id} value={item?.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Box>

            <ImageFileUpload
              add={add}
              editable={editable}
              setAdd={setAdd}
              resetImageFile={resetImageFile}
              image={product?.image}
              handleImageUpload={(e) => handleImageUpload(e)}
              imageFileerror={imageFileerror}
              label={"product Image"}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
            />

            {add && (
              <ImageFileDisplay imageFile={imageFile} alt={values.name} />
            )}
            {product?.hasAttributes ? (
              <>
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
                {editable && product?.hasAttributes && (
                  <AddAttributes
                    attributesData={attributesData}
                    handleChangeattribute={handleChangeattribute}
                    indexcount={indexcount}
                    allattributes={allattributes}
                    setattributesData={setattributesData}
                  />
                )}
              </>
            ) : (
              <CustomTextField
                type={"text"}
                name="count"
                label={"Product count"}
                handleBlur={editable && handleBlur}
                handleChange={editable && handleChange}
                value={values.count}
                touched={touched.count}
                errors={errors.count}
                variant={editable ? "filled" : "standard"}
              />
            )}

            {editable && <FormButton theme={theme}>Save</FormButton>}
          </FormCard>
        )}
      </Formik>
      <Box ref={ref} sx={{ marginBottom: 10 }}></Box>
    </CustomContainer>
  );
}

export default ProductDetails;
