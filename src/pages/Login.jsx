import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Login() {

const navigate = useNavigate();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const [showPassword, setShowPassword] =
useState(false);

useEffect(() => {


const token =
  localStorage.getItem(
    "token"
  );

if (token) {

  navigate("/");

}


}, [navigate]);

const handleLogin =
async (e) => {

  e.preventDefault();

  try {

    const response =
      await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

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

    toast.success(
      "Login Successful"
    );

    navigate("/");

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Login Failed"
    );

  }

};

return (

<div
  className="
  min-h-screen
  grid
  lg:grid-cols-2
  bg-slate-950
  relative
  overflow-hidden
"
>

  <div
    className="
    absolute
    top-0
    left-0
    w-[500px]
    h-[500px]
    bg-purple-600/20
    blur-[180px]
    rounded-full
  "
  />

  <div
    className="
    absolute
    bottom-0
    right-0
    w-[500px]
    h-[500px]
    bg-blue-600/20
    blur-[180px]
    rounded-full
  "
  />

  <div
    className="
    hidden
    lg:flex
    flex-col
    justify-center
    px-24
    bg-gradient-to-br
    from-purple-950
    via-slate-950
    to-slate-950
    relative
    z-10
  "
  >

    <h1
      className="
      text-8xl
      font-black
      bg-gradient-to-r
      from-purple-400
      to-pink-400
      bg-clip-text
      text-transparent
    "
    >
      XENO
    </h1>

    <p
      className="
      text-slate-400
      text-2xl
      mt-4
    "
    >
      AI Powered CRM Platform
    </p>

    <div className="mt-16 space-y-8">

      <div>
        <h3 className="text-xl font-bold">
          ✨ Smart Campaigns
        </h3>

        <p className="text-slate-400 mt-2">
          Launch intelligent campaigns across channels.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold">
          🎯 Audience Segmentation
        </h3>

        <p className="text-slate-400 mt-2">
          Automatically target the right customers.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold">
          📈 Real-Time Analytics
        </h3>

        <p className="text-slate-400 mt-2">
          Track opens, clicks and conversions instantly.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold">
          🤖 AI Recommendations
        </h3>

        <p className="text-slate-400 mt-2">
          Get growth suggestions powered by AI.
        </p>
      </div>

    </div>

  </div>

  <div
    className="
    flex
    items-center
    justify-center
    p-8
    relative
    z-10
  "
  >

    <form
      onSubmit={handleLogin}
      className="
      w-full
      max-w-md
      bg-slate-900/80
      backdrop-blur-xl
      border
      border-slate-800
      rounded-3xl
      p-10
      shadow-2xl
    "
    >

      <h2
        className="
        text-4xl
        font-bold
      "
      >
        Welcome Back 👋
      </h2>

      <p
        className="
        text-slate-400
        mt-2
      "
      >
        Login to continue managing your CRM.
      </p>

      <div className="mt-8">

        <label
          className="
          text-slate-400
          text-sm
        "
        >
          Email Address
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="Enter your email"
          className="
          w-full
          mt-2
          bg-slate-800
          border
          border-slate-700
          focus:border-purple-500
          outline-none
          p-4
          rounded-xl
        "
        />

      </div>

      <div className="mt-5">

        <label
          className="
          text-slate-400
          text-sm
        "
        >
          Password
        </label>

        <div className="relative">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Enter your password"
            className="
            w-full
            mt-2
            bg-slate-800
            border
            border-slate-700
            focus:border-purple-500
            outline-none
            p-4
            rounded-xl
          "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
            absolute
            right-4
            top-6
            text-slate-400
          "
          >
            {showPassword
              ? "🙈"
              : "👁"}
          </button>

        </div>

      </div>

      <button
        type="submit"
        className="
        w-full
        mt-8
        bg-gradient-to-r
        from-purple-600
        to-pink-600
        hover:scale-105
        transition-all
        duration-300
        py-4
        rounded-xl
        font-semibold
      "
      >
        Login
      </button>

      <p
        className="
        text-center
        text-slate-400
        mt-6
      "
      >

        Don't have an account?

        <span
          onClick={() =>
            navigate(
              "/register"
            )
          }
          className="
          text-purple-400
          ml-2
          cursor-pointer
        "
        >
          Register
        </span>

      </p>

    </form>

  </div>

</div>


);

}

export default Login;
