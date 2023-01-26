import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../Theme";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import FormCard from "../../components/Forms/FormCard";
import FormButton from "../../components/Forms/FormButton";
import CustomTextField from "../../components/Forms/CustomTextField";

const initialValues = {
  email: "",
  password: "",
};
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
];
function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    dispatch(authActions.Login());
    navigate("/");
  };
  const formValidation = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <Stack direction={"row"} height={"100vh"}>
      <Box width={"100%"} display={"flex"} alignContent={"center"}>
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
              <Typography
                variant="h2"
                textAlign={"center"}
                color={colors.grey[100]}
                sx={{ mb: "5px", cursor: "pointer" }}
              >
                Logo Placeholder
              </Typography>
              <CustomTextField
                type={"text"}
                name="email"
                label={"Email"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.email}
                touched={touched.email}
                errors={errors.email}
              />
              <CustomTextField
                type={"password"}
                name="password"
                label={"Password"}
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.password}
                touched={touched.password}
                errors={errors.password}
              />
              <FormButton theme={theme}>Login</FormButton>
            </FormCard>
          )}
        </Formik>
      </Box>

      <Box width={"100%"} bgcolor={colors.primary[600]} overflow={"scroll"}>
        <ImageList sx={{ padding: 2 }} variant="woven" cols={3} gap={8}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=161&fit=crop&auto=format`}
                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Stack>
  );
}

export default Login;
