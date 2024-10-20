import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import AnimateButton from "../../../components/@extended/AnimateButton";
import { Login } from "../../../services/auth.api";
import { login } from "../../../store/reducers/auth";

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const authMutation = useMutation(Login, {
    onSuccess: (data) => {
      const user = data?.data?.user;
      const accessToken = data?.data?.tokens;
      dispatch(login({ user, tokens: accessToken }));
      toast.success("Đăng nhập thành công");
      setTimeout(() => {
        navigate("/admin/users", { replace: true });
      }, 1000);
    },
    onError: (error) => {
      toast.error("Đăng nhập thất bại");
    },
  });

  return (
    <Formik
      initialValues={{
        phoneOrUsername: "",
        password: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        phoneOrUsername: Yup.string().required("Vui lòng nhập số điện thoại"),
        password: Yup.string().max(255).required("Mật khẩu là bắt buộc"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: false });
          setSubmitting(true);
          await authMutation.mutateAsync(values);
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="phone-login">Tên/Số điện thoại</InputLabel>
                <OutlinedInput
                  id="phone-login"
                  type="text"
                  value={values.phoneOrUsername}
                  name="phoneOrUsername"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Nhâp tên/số diện thoại"
                  error={Boolean(
                    touched.phoneOrUsername && errors.phoneOrUsername
                  )}
                />
                {touched.phoneOrUsername && errors.phoneOrUsername && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-phone-login"
                  >
                    {errors.phoneOrUsername}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-login">Mật khẩu</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="-password-login"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        size="large"
                      >
                        {showPassword ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Nhâp mật khẩu"
                />
                {touched.password && errors.password && (
                  <FormHelperText
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Đăng nhập
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthLogin;
