import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

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
      if (isLoginForm) {
        const res = await axios.post(
          BASE_URL + "/login",
          { email, password },
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
        navigate("/");
      } else {
        const res = await axios.post(
          `${BASE_URL}/createUser`,
          { email, password, firstName, lastName },
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
        navigate("/profile");
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLoginForm ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Signup Fields */}
        {!isLoginForm && (
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="text-center text-sm mt-4 text-gray-600 cursor-pointer hover:underline"
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