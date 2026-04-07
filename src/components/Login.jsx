import React, { useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      if (!email || !password) {
        setError("Please fill all fields");
        return;
      }
      if (isLoginForm) {
        const res = await api.post(
          "/login",
          { email, password },
          { withCredentials: true },
        );
        localStorage.setItem('token',res.data.token)
        dispatch(addUser(res.data.user));
        navigate("/app/feed");
      } else {
        const res = await api.post(
          `/createUser`,
          { email, password, firstName, lastName },
          { withCredentials: true },
        );

        dispatch(addUser(res.data.user));
        navigate("/app/profile");
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 relative overflow-hidden">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold text-lg text-gray-800">
          <img src="/logo.jpg" className="w-8 h-8 rounded-lg" />
          DevHub
        </div>

        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          Back
        </button>
      </div>
      {/* Animated Blobs */}
      <motion.div
        className="absolute w-75 h-75 bg-blue-300 rounded-full blur-[100px] opacity-40 top-10 left-10 z-0"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-75 h-75 bg-purple-300 rounded-full blur-[100px] opacity-40 bottom-10 right-10 z-0"
        animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-100 h-100 bg-indigo-200 rounded-full blur-[120px] opacity-30 z-0"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 relative z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isLoginForm ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Signup Fields */}
        {!isLoginForm && (
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}

        {/* Common Fields */}
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          onClick={handleSignIn}
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isLoginForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle */}
        <p
          className="text-center text-sm mt-4 text-gray-600 cursor-pointer hover:text-blue-600"
          onClick={() => {
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setError("");
            setIsLoginForm((prev) => !prev);
          }}
        >
          {isLoginForm
            ? "New here? Create an account"
            : "Already have an account? Sign in"}
        </p>
      </div>
    </div>
  );
};

export default Login;
