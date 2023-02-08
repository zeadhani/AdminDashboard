import { Button, MenuItem, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useImage from "../../components/hooks/general/useImage";
import CustomContainer from "../global/CustomContainer";
import { handleTitleClick } from "../../utils/functions";
import { Formik } from "formik";
import FormCard from "../../components/Forms/FormCard";
import CustomTextField from "../../components/Forms/CustomTextField";
import FormButton from "../../components/Forms/FormButton";
import useBrandData from "../../components/hooks/merchants/useBrandData";
import CustomSelect from "../../components/Forms/CustomSelect";
import CustomDateSelector from "../../components/Forms/CustomDateSelector";
import ImageFileUpload from "../../components/Forms/ImageFileUpload";
import ImageFileDisplay from "../../components/Forms/imageFileDisplay";
import useSingleBrand from "../../components/hooks/merchants/useSingleBrand";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { ArrowRight } from "@mui/icons-material";
import authFetch from "../../services/interceptors";
function BrandDetails() {
  let { id } = useParams();
  let { state } = useLocation();
  const { categories, pref } = useBrandData();
  const navigate = useNavigate();
  if (!state) {
    state = {
      editable: "false",
    };
  }
  const editable = state.editable === "true";
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [add, setAdd] = useState();
  const [brandError, setBrandError] = useState(false);

  const { brand, brandPreferences, brandCtegories } = useSingleBrand(
    setServerErrors,
    id,
    setLoading
  );
  const {
    handleImageUpload,
    imageFile,
    imageFileerror,
    resetImageFile,
    changeImageFileError,
  } = useImage();
  const [dateValue, setDateValue] = useState(brand?.contrat_Expire);
  let form_data = new FormData();
  useEffect(() => {
    setDateValue(brand?.contrat_Expire);
  }, [brand]);

  const handleFormSubmit = async (values) => {
    if (!editable) return;
    setServerErrors("");
    if (values.categories.length === 0) {
      setBrandError(true);
      return;
    }
    if (dateValue === undefined || new Date(dateValue) <= new Date()) {
      setServerErrors("Please Enter Valid Date");
      return;
    }
    if (add) {
      if (!imageFile || imageFileerror) {
        changeImageFileError("Image is required");
        return;
      }
    }

    const { name, email, prefrence, categories } = values;

    setLoading(true);
    form_data.append("name", name);
    form_data.append("email", email);
    form_data.append("prefrence", prefrence);
    form_data.append("categories", categories);
    if (imageFile) {
      form_data.append("image", imageFile);
    }
    form_data.append("contrat_Expire", new Date(dateValue).toISOString());
    try {
      const res = await authFetch.patch(`/brand/${id}`, form_data);
      if (res.statusText !== "OK") return;
      toast("Brand edited successfully");
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

  const initialValues = {
    name: brand ? brand.name : "",
    email: brand ? brand.email : "",
    prefrence: brandPreferences ? brandPreferences : "",
    categories: brandCtegories ? brandCtegories : [],
  };
  const handleViewOffers = () => {
    navigate(`offers`, {
      state: { brandName: brand.name },
    });
  };
  return (
    <CustomContainer
      title={"BOGO MERCHANTS"}
      subtitle={
        editable ? "Editing your bogo brand!" : "Viewing your bogo brand!"
      }
      onClick={() => handleTitleClick(navigate, "Merchants")}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={formValidation}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <FormCard
            serverErrors={serverErrors}
            loading={loading}
            handleSubmit={handleSubmit}
          >
            <Button
              component="a"
              variant="contained"
              onClick={handleViewOffers}
              color="info"
              endIcon={<ArrowRight color="primary" />}
            >
              view offers
            </Button>
            <CustomTextField
              type={"text"}
              name="name"
              label={"Brand Name"}
              value={values.name}
              touched={touched.name}
              errors={errors.name}
              variant={editable ? "filled" : "standard"}
              disabled={!editable}
            />
            <CustomTextField
              type={"text"}
              name="email"
              label={"Brand Email"}
              variant={editable ? "filled" : "standard"}
              value={values.email}
              touched={touched.email}
              errors={errors.email}
              disabled={!editable}
            />
            <CustomTextField
              type={"text"}
              name="prefrence"
              label={"Product Preference"}
              variant={editable ? "filled" : "standard"}
              touched={touched.prefrence}
              errors={errors.prefrence}
              value={values.prefrence}
              select={editable}
              disabled={!editable}
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
              editable={editable.toString()}
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
              setDateValue={editable && setDateValue}
              editable={editable}
            />
            <ImageFileUpload
              add={add}
              editable={editable}
              setAdd={setAdd}
              resetImageFile={resetImageFile}
              image={brand?.image}
              handleImageUpload={(e) => handleImageUpload(e)}
              imageFileerror={imageFileerror}
              label={"brand Image"}
              disabled={!editable}
              variant={editable ? "filled" : "standard"}
            />
            {add && (
              <ImageFileDisplay imageFile={imageFile} alt={values.name} />
            )}
            {editable && <FormButton theme={theme}>Save</FormButton>}
          </FormCard>
        )}
      </Formik>
    </CustomContainer>
  );
}

export default BrandDetails;
