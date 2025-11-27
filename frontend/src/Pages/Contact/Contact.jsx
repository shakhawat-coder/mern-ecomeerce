import React from "react";
import Breadcramb from "../../components/CommonComponents/Breadcramb";
import { IoMdCall } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetContactFormMutation } from "../../Features/Api/exclusive.Api";
import { errorToast, successToast } from "../../helper/Toast";
const Contact = () => {
  const [contactData, { isLoading, error, isSuccess }] =
    useGetContactFormMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Name must be 50 characters or less")
        .min(3, "Name must be at least 2 characters")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Enter a valid email address"
        )
        .required("Required"),
      phone: Yup.string()
        .min(11, "Phone number must be 11 digits")
        .max(11, "Phone number must be 11 digits")
        .required("Required"),
      message: Yup.string().required("Required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log("Form Values", values);
      try {
        const { name, email, phone, message } = values;
        const response = await contactData({
          name,
          email,
          phone,
          message,
        }).unwrap();
        successToast("Message sent successfully");
        resetForm();
      } catch (error) {
        errorToast("Failed to send message");
      }
    },
  });
  return (
    <>
      <div className="container mx-auto py-20">
        <Breadcramb />
        <div className="grid grid-cols-3">
          <div className="col-span-1 flex flex-col gap-y-8 p-5">
            <div>
              <div className="flex items-center gap-4">
                <IoMdCall className="h-8 w-8 p-2 bg-red-400 text-white rounded-full" />
                <h2 className="text-2xl font-bold">Call to Us</h2>
              </div>

              <p className="">We are available 24/7, 7 days a week.</p>
              <p>
                Phone:{" "}
                <a href="tel:01780551403" className="text-gray-600">
                  01780551403
                </a>
              </p>
            </div>
            <div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="h-8 w-8 p-2 bg-red-400 text-white rounded-full" />
                <h2 className="text-2xl font-bold">Write to Us</h2>
              </div>

              <p className="">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p>
                Email:
                <a
                  href="mailto:shakhawathossen188@gmail.com"
                  className="text-gray-600"
                >
                  shakhawathossen188@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="col-span-2 p-5">
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="w-full p-2 bg-gray-100 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.name}
                    </span>
                  ) : null}
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full p-2 bg-gray-100 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </div>
                <div>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    className="w-full p-2 bg-gray-100 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.phone}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className=" my-5">
                <div>
                  <textarea
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Message"
                    className="w-full min-h-28 p-2 bg-gray-100 rounded"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <span className="block mt-4 text-red-500">
                      {formik.errors.message}
                    </span>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="py-4 px-[48px] bg-red-500 font-popins font-medium text-white text-[16px] rounded cursor-pointer"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

// class 96 ,25mtn done
