import React, { useState } from "react";
import login from "/login.jpg";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useGetLoginUserMutation } from "../../Features/Api/exclusive.Api";
const Login = () => {
  const [loginuser, { isLoading, isSuccess, error, data }] =
    useGetLoginUserMutation();
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Enter a valid email address"
        )
        .required("Required"),
      password: Yup.string()
        .min(
          6,
          "Password must contain uppercase, lowercase, number, and special character"
        )
        .max(15, "Password must not exceed 15 characters")
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        //   "Must be at least 8 characters"
        // )
        .required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Values", values);
      try {
        const { email, password } = values;
        const response = await loginuser({ email, password }).unwrap();
        alert("Login Successfull!");
        resetForm();
        navigate("/");
      } catch (error) {
        console.error("Login Error:", error);
      }
    },
  });
  return (
    <>
      <div className="py-[140px]">
        <div className="container mx-auto">
          <div className="flex items-center gap-x-10">
            <div className="w-[50%] ">
              <img src={login} alt="" />
            </div>
            <div className="w-[40%]">
              <div className="flex flex-col gap-y-4">
                <h2 className="text-[36px] font-medium font-inter text-black">
                  Log in to Exclusive
                </h2>
                <p className="text-[16px] font-normal font-popins text-text_black000000">
                  Enter your details below
                </p>
                <form action="" onSubmit={formik.handleSubmit}>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email or Phone Number"
                    className="border-b-2 border-b-gray-200 w-[60%] p-3"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />

                  {formik.touched.email && formik.errors.email ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.email}
                    </span>
                  ) : null}

                  <div className="relative">
                    <input
                      type={eye ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="password"
                      className="border-b-2 border-b-gray-200 w-[60%] p-3"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <span
                      className="absolute right-[41%] top-1/2 -translate-y-1/2"
                      onClick={() => setEye(!eye)}
                    >
                      {eye ? (
                        <FaEyeSlash className="cursor-pointer text-xl" />
                      ) : (
                        <FaEye className="cursor-pointer text-xl" />
                      )}
                    </span>
                  </div>

                  {formik.touched.password && formik.errors.password ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.password}
                    </span>
                  ) : null}

                  <div className="flex items-center gap-x-[87px] mt-[30px]">
                    <button
                      type="submit"
                      className="py-4 px-[48px] bg-red-500 font-popins font-medium text-white text-[16px] rounded cursor-pointer"
                    >
                      Log In
                    </button>
                    <Link
                      to="/forgotpassword"
                      className="text-red-500 font-popins font-medium  text-[16px] cursor-pointer"
                    >
                      Forget Password?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
