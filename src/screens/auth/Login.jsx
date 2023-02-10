import {
  Box,
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
import { mockLoginData as itemData } from "../../data/mockData";

import { toast } from "react-toastify";
import authFetch from "../../services/interceptors";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
};
function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [serverErrors, setServerErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (values) => {
    setServerErrors("");
    const { email, password } = values;
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        { email, password }
      );

      if (res.statusText !== "OK") return;
      dispatch(
        authActions.Login({
          user: res.data.user.email,
          token: res.data.token,
        })
      );
      navigate("/");
      toast("Welcome back!");
    } catch (err) {
      setServerErrors(err.response.data.error);
    }
    setLoading(false);
  };
  const formValidation = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  return (
    <Stack direction={"row"} height={"100vh"} overflow={"hidden"}>
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
                value={values.email}
                touched={touched.email}
                errors={errors.email}
              />
              <CustomTextField
                type={"password"}
                name="password"
                label={"Password"}
                value={values.password}
                touched={touched.password}
                errors={errors.password}
              />
              <FormButton theme={theme}>Login</FormButton>
            </FormCard>
          )}
        </Formik>
      </Box>

      <Box
        width={"100%"}
        className="loginscreen"
        height={"100%"}
        bgcolor={colors.primary[600]}
      >
        <ImageList
          sx={{
            padding: 2,
            overflowY: "scroll",
            backgroundColor: colors.primary[600],
          }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {itemData.map((item) => (
            <ImageListItem key={item.title}>
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
