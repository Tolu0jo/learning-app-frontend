"use client";
import { IRegister } from "@/redux/features/auth/authApi";
import { login } from "@/redux/features/auth/authThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  resetAuthError,
  resetAuthSuccess,
} from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [inputData, setInputData] = useState<IRegister>({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { loading, error, success, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetAuthSuccess());
      if (user && user.role === "TEACHER") {
        router.push("admin/dashboard");
      } else {
        router.push("dashboard");
      }
    } else if (error) {
      toast.error(error);
      dispatch(resetAuthError());
    }
  }, [success, error, user]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login(inputData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md sm:space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl">
          Login
        </h2>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-900" // Explicitly setting text color
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={inputData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-900" // Explicitly setting text color
                placeholder="Enter your password"
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="text-center">
          <a href="/register" className="text-blue-600 hover:underline">
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
