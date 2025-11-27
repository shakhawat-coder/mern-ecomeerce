import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import login from "/login.jpg";
import { useNavigate } from "react-router";
import { useGetRegisterUserMutation } from "../../Features/Api/exclusive.Api";
const SignUp = () => {
  const [registerUser, { data, isLoading, error, isSuccess }] =
    useGetRegisterUserMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters")
        .max(30, "Name must be 30 characters or less"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Invalid email address"
        )
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        //   "Must be at least 6 characters with at least one uppercase letter, one lowercase letter, one number, and one special character")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form Values:", values);
      try {
        const { name, email, password } = values;
        const response = await registerUser({ name, email, password }).unwrap();
        alert("User registered successfully!");
        navigate("/verify-user", { state: { email } });
        resetForm();
      } catch (error) {
        alert(error?.data?.message || "Registration failed!");
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
                <h1 className="text-3xl font-bold mb-6 text-center">
                  Registration
                </h1>
                <p className="text-[16px] font-normal font-popins text-text_black000000">
                  Enter your details below
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  className="max-w-md bg-white p-8 rounded-lg shadow-md"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="text-red-500">{formik.errors.name}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-500">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-red-500">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div className="text-red-500">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>
                  {/* <div className="mb-4">
                    <input type="checkbox" name="" id="" />
                  </div> */}
                  <button
                    type="submit"
                    className="font-popins font-medium text-lg cursor-pointer  flex justify-center items-center w-full h-12 bg-black text-white"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
