import React, { useState } from "react";
import login from "/login.jpg";
import { useFormik } from "formik";
import { Link } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
const Login = () => {
  const [eye, setEye] = useState(false);
  const formik = useFormik({
    initialValues: {
      emailorphone: "",
      Password: "",
    },
    validationSchema: Yup.object({
      emailorphone: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Enter a valid email address"
        )
        .required("Required"),
      Password: Yup.string()
        .min(
          8,
          "Password must contain uppercase, lowercase, number, and special character"
        )
        .max(15, "Password must not exceed 15 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Must be at least 8 characters"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
                    name="emailorphone"
                    id="emailorphone"
                    placeholder="Email or Phone Number"
                    className="border-b-2 border-b-gray-200 w-[60%] p-3"
                    onChange={formik.handleChange}
                    value={formik.values.emailorphone}
                  />

                  {formik.touched.emailorphone && formik.errors.emailorphone ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.emailorphone}
                    </span>
                  ) : null}

                  <div className="relative">
                    <input
                      type={eye ? "text" : "password"}
                      name="Password"
                      id="Password"
                      placeholder="Password"
                      className="border-b-2 border-b-gray-200 w-[60%] p-3"
                      onChange={formik.handleChange}
                      value={formik.values.Password}
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

                  {formik.touched.Password && formik.errors.Password ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.Password}
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

// const Login = () => {
//   return (
//

//           <div className="w-[40%]">
//             <div className="flex flex-col gap-y-4">
//               <h2 className="text-[36px] font-medium font-inter text-text_black000000">
//                 Log in to Exclusive
//               </h2>
//               <p className="text-[16px] font-normal font-popins text-text_black000000">
//                 Enter your details below
//               </p>
// <form action="" onSubmit={formik.handleSubmit}>
//   <input
//     type="text"
//     name="emailorphone"
//     id="emailorphone"
//     placeholder="Email or Phone Number"
//     className="border-b-2 border-b-gray-200 w-[60%] py-3"
//     onChange={formik.handleChange}
//     value={formik.values.emailorphone}
//   />

//   {formik.touched.emailorphone && formik.errors.emailorphone ? (
//     <span className="block mt-4 text-red-500">
//       {formik.errors.emailorphone}
//     </span>
//   ) : null}

//   <div className="relative">
//     <input
//       type={eye ? "text" : "password"}
//       name="Password"
//       id="Password"
//       placeholder="Password"
//       className="border-b-2 border-b-gray-200 w-[60%] py-3"
//       onChange={formik.handleChange}
//       value={formik.values.Password}
//     />
//     <span
//       className="absolute right-[41%] top-1/2 -translate-y-1/2"
//       onClick={() => setEye(!eye)}
//     >
//       {eye ? (
//         <FaEyeSlash className="cursor-pointer text-xl" />
//       ) : (
//         <FaEye className="cursor-pointer text-xl" />
//       )}
//     </span>
//   </div>

//   {formik.touched.Password && formik.errors.Password ? (
//     <span className="block mt-4 text-red-500">
//       {formik.errors.Password}
//     </span>
//   ) : null}

//   <div className="flex items-center gap-x-[87px] mt-[30px]">
//     <button
//       type="submit"
//       className="py-4 px-[48px] bg-redDB4444 font-popins font-medium text-white_FFFFFF text-[16px] rounded"
//     >
//       Log In
//     </button>
//     <Link
//       to="/forgotpassword"
//       className="text-redDB4444 font-popins font-medium  text-[16px] cursor-pointer"
//     >
//       Forget Password?
//     </Link>
//   </div>
// </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Login;
