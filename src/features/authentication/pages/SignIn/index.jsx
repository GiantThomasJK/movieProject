import { Input, Button } from "antd";
import { useFormik } from "formik";
import styles from "./style.module.css";
import * as yup from "yup";
import React, { useState } from "react";
import instance from "api/instance";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_PROFILE } from "features/authentication/action";

const schema = yup.object().shape({
  taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
  matKhau: yup
    .string()
    .required("*Trường này bắt buộc nhập")
    .min(8, "*Mật khẩu phải từ 8 tới 16 kí tự"),
});

function SignIn() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    onSubmit: (values) => {
      const newUser = { ...values };
      signIn(newUser);
    },

    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  const signIn = async (user) => {
    try {
      setIsLoading(true);
      const res = instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });

      const profile = { ...res.data.content };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.accessToken);
      dispatch({
        type: SET_PROFILE,
        payload: profile,
      });
      history.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Sign In</h2>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <Input
          name="taiKhoan"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="text"
          placeholder="Username"
        />
        {formik.touched.taiKhoan && formik.errors.taiKhoan && (
          <p className={styles.errorText}>{formik.errors.taiKhoan}</p>
        )}
        <Input
          name="matKhau"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={styles.input}
          type="password"
          placeholder="Password"
        />
        {formik.touched.matKhau && formik.errors.matKhau && (
          <p className={styles.errorText}>{formik.errors.matKhau}</p>
        )}
        <Button
          htmlType="submit"
          className={styles.input}
          type="primary"
          loading={isLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SignIn;
