import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import FormCard from "../../components/Forms/FormCard";
import CustomTextField from "../../components/Forms/CustomTextField";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import FormButton from "../../components/Forms/FormButton";
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
import authFetch from "../../services/interceptors";
import { ArrowRight } from "@mui/icons-material";

function ProductDetails() {
  let { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { editable } = state;
  const theme = useTheme();
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const { data } = useFilteredData();
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

    const { name, price, category, gender, brand, count, offer, select } =
      values;

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
    const offerName = select ? select.split("/")[0] : offer.split("/")[0];
    const highestPrice = select ? select.split("to")[1] : offer.split("to")[1];
    const lowestPrice = select
      ? select.split("from")[1].split("to")[0]
      : offer.split("from")[1].split("to")[0];
    setLoading(true);
    form_data.append("name", name);
    form_data.append("price", price);
    form_data.append("category", category);
    form_data.append("gender", hasGender ? gender : "");
    form_data.append("brand", brand);
    form_data.append(
      "hasAttributes",
      product.hasAttributes === 1 ? true : false
    );
    form_data.append("offer", offerName);
    form_data.append("lowestPrice", Number(lowestPrice));
    form_data.append("highestPrice", Number(highestPrice));

    try {
      setServerErrors("");
      const res = await authFetch.patch(`/products/${product.id}`, form_data);
      if (res.statusText !== "OK") return;
      if (!product.hasAttributes) {
        toast("Product edited successfully");
        setLoading(false);
        return;
      }
      const result = await authFetch.post(
        `/products/${res.data.editedProduct.id}/additem`,
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
  const [hasGender, setHasGender] = useState(false);
  const formValidation = yup.object().shape({
    name: yup.string().required("name is required"),
    price: yup.number().integer().min(1).required("price is required"),
    category: yup.string().ensure().required("category is required!"),
    gender: hasGender && yup.string().ensure().required("gender is required!"),
    brand: yup.string().ensure().required("brand is required!"),
    count: yup.number().integer().min(0).required("brand is required!"),
    offer: yup.string().ensure().required("offer is required!"),
    // select: yup.string().ensure().required("offer is required!"),
  });

  const handleDelete = async (name) => {
    try {
      const deleteItem = await authFetch.delete(`/products/${id}/item/${name}`);
      if (deleteItem.status === 200) {
        const newArray = [...items];
        const resullt = newArray.filter((item) => item.name !== name);
        newItems(resullt);
      }
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
  };
  const handleOffer = (id) => {
    return async () => {
      if (!id) return;
      try {
        const offersData = await authFetch.get(`/offer/brand/${id}`);
        setOffers(offersData.data);
      } catch (err) {
        setServerErrors(err);
      }
    };
  };

  const initialValues = {
    name: product ? product.name : "",
    price: product ? product.price : 0,
    category: product ? product.Category.name : "",
    gender: product ? product.Gender?.name : "",
    brand: product ? product.Brands.name : "",
    count: product ? product.count : 0,
    offer: product
      ? product.offers.name +
        "/from" +
        product?.offers.OfferRange.lowestPrice +
        "to" +
        product?.offers.OfferRange.highestPrice
      : "",
    select: "",
  };
  const handleViewReviews = () => {
    navigate("/Reviews/" + product.id);
  };
  const handlecheckGender = () => {
    setHasGender(!hasGender);
  };
  useEffect(() => {
    handleOffer(product?.brandsId)();
    setHasGender(Boolean(product?.Brands.hasGender));
  }, [product]);

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
        {({ values, errors, touched, handleSubmit }) => (
          <FormCard
            serverErrors={serverErrors}
            loading={loading}
            handleSubmit={handleSubmit}
          >
            <Button
              component="a"
              variant="contained"
              onClick={handleViewReviews}
              sx={{
                color: "#fff",
                bgcolor: theme.palette.mode === "dark" ? "#535ac8" : "#1f2a40",
              }}
              endIcon={<ArrowRight color="primary" />}
            >
              View Reviews
            </Button>
            <CustomTextField
              type={"text"}
              name="name"
              label={"product Name"}
              value={values.name}
              touched={touched.name}
              errors={errors.name}
              variant={editable ? "filled" : "standard"}
              disabled={!editable}
            />
            <CustomTextField
              type={"text"}
              name="price"
              label={"Product price"}
              value={values.price}
              touched={touched.price}
              errors={errors.price}
              variant={editable ? "filled" : "standard"}
              disabled={!editable}
            />
            <CustomTextField
              type={"text"}
              name="category"
              label={"Product Category"}
              value={values.category}
              touched={touched.category}
              errors={errors.category}
              select={editable}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
            >
              {data?.categories.map((item) => (
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
                fullWidth
                value={values.brand}
                touched={touched.brand}
                disabled={!editable}
                error={errors.brand}
                select={editable}
                variant={editable ? "filled" : "standard"}
              >
                {data?.brands.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.name}
                    onClick={handleOffer(item?.id)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </CustomTextField>

              <CustomTextField
                type={"text"}
                name={
                  values.brand === product?.Brands.name && offers?.length > 0
                    ? "offer"
                    : "select"
                }
                label={"choose offer"}
                touched={editable && touched.offer}
                errors={editable && errors.offer}
                select={editable}
                disabled={!editable}
                variant={editable ? "filled" : "standard"}
              >
                {offers?.length === 0 && <MenuItem>no offers</MenuItem>}
                {offers?.length > 0 &&
                  offers.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={
                        item.name +
                        "/from" +
                        item?.OfferRange.lowestPrice +
                        "to" +
                        item?.OfferRange.highestPrice
                      }
                    >
                      {item.name +
                        "/from" +
                        item?.OfferRange.lowestPrice +
                        "to" +
                        item?.OfferRange.highestPrice}
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

            {editable && (
              <FormControlLabel
                control={
                  <Checkbox
                    color="info"
                    value={hasGender}
                    checked={hasGender}
                    onChange={handlecheckGender}
                  />
                }
                label="Does this product has gender ?"
              />
            )}

            {hasGender && (
              <CustomTextField
                type={"text"}
                name="gender"
                label={"Product gender"}
                value={values.gender}
                touched={touched.gender}
                errors={errors.gender}
                disabled={!editable}
                select={editable}
                variant={editable ? "filled" : "standard"}
              >
                {data?.gender.map((item) => (
                  <MenuItem key={item.id} value={item?.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </CustomTextField>
            )}
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
                      id={product.id}
                    />
                  ))}
                </Box>
                {editable && product?.hasAttributes && (
                  <AddAttributes
                    attributesData={attributesData}
                    handleChangeattribute={handleChangeattribute}
                    indexcount={indexcount}
                    allattributes={data?.allattributes}
                    setattributesData={setattributesData}
                  />
                )}
              </>
            ) : (
              <CustomTextField
                type={"text"}
                name="count"
                label={"Product count"}
                value={values.count}
                touched={touched.count}
                errors={errors.count}
                disabled={!editable}
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
