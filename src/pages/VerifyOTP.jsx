import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function VerifyOTP() {

  const location =
    useLocation();

    const navigate =
  useNavigate();

  const email =
    location.state?.email;

  const [otp, setOtp] =
    useState("");

const verify =
  async () => {

    try {

      const response =
        await api.post(
          "/auth/verify-otp",
          {
            email,
            otp,
          }
        );

      toast.success(
        "Email Verified Successfully"
      );

      if (
        response.data.token
      ) {

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(
            response.data.user
          )
        );

      }

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Verification Failed"
      );

    }

  };
  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-xl w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-white">
          Verify OTP
        </h1>

        <p className="mb-4 text-slate-400">
          {email}
        </p>

        <input
          placeholder="Enter OTP"
          className="w-full p-3 rounded bg-slate-800 mb-4"
          value={otp}
          onChange={(e) =>
            setOtp(
              e.target.value
            )
          }
        />

        <button
          onClick={verify}
          className="w-full bg-green-600 p-3 rounded"
        >
          Verify
        </button>

      </div>

    </div>

  );
}

export default VerifyOTP;