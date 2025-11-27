import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Breadcramb from "../../components/CommonComponents/Breadcramb";
import { successToast, errorToast } from "../../helper/Toast";
import { useGetVerifyOtpMutation } from "../../Features/Api/exclusive.Api";

const VerifyUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  console.log(userData);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const [verifyOtp, { isLoading }] = useGetVerifyOtpMutation();
  // const [resendOtp] = useResendOtpMutation();

  const email = userData?.email;
  const backendOtp = userData?.otp;

  // Input change handler
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const newOtp = [...otp];
    digits.forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);

    const next = newOtp.findIndex((x) => x === "");
    inputRefs.current[next !== -1 ? next : 5]?.focus();
  };

  // Verify OTP
  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      return errorToast("Enter all 6 digits");
    }

    try {
      const res = await verifyOtp({ email, otp: otpString }).unwrap();

      successToast(res.message);
      navigate("/login");
    } catch (err) {
      errorToast(err.data?.message || "Invalid OTP");

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      const res = await resendOtp({ email }).unwrap();
      successToast("OTP resent successfully");

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      errorToast("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10">
        <Breadcramb />

        <div className="flex justify-center items-center my-20">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            {/* Show OTP from backend */}
            <p className="text-center text-green-700 text-lg mb-3">
              Your OTP: <span className="font-bold">{backendOtp}</span>
            </p>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Verify Your Email
              </h1>
              <p className="text-gray-600">
                Enter the 6-digit OTP sent to <strong>{email}</strong>
              </p>
            </div>

            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full bg-red-500 text-white py-3 rounded-lg mb-4"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Didn’t receive the code?
                <button
                  onClick={handleResend}
                  className="text-red-500 ml-1 font-medium"
                >
                  Resend OTP
                </button>
              </p>
            </div>

            <div className="text-center mt-6 border-t pt-6">
              <p className="text-gray-600 text-sm">
                Already verified?
                <button
                  onClick={() => navigate("/login")}
                  className="text-red-500 ml-1"
                >
                  Go to Login
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
