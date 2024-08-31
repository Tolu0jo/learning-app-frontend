"use client";
import { register } from "@/redux/features/auth/authThunk";
import { RootState } from "@/redux/store";
import { useAppDispatch } from "@/redux/utils";
import React, { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  resetAuthError,
  resetAuthSuccess,
} from "@/redux/features/auth/authSlice";
const Register = () => {
  const router = useRouter();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    isTeacherAdmin: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(useSelector((state: RootState) => state.auth));
  const handleChange = (e: {
    target: { name: string; value: string; type: string; checked: boolean };
  }) => {
    const { name, value, type, checked } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(resetAuthSuccess());
      router.push("/");
    } else if (error) {
      toast.error(error);
      dispatch(resetAuthError());
    }
  }, [success, error]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputData.isTeacherAdmin) {
      dispatch(
        register({
          name: inputData.name,
          email: inputData.email,
          password: inputData.password,
          role: "TEACHER",
        })
      );
    } else {
      dispatch(
        register({
          name: inputData.name,
          email: inputData.email,
          password: inputData.password,
        })
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md sm:space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl">
          Register
        </h2>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={inputData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-900"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={inputData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-900"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 text-gray-900"
                placeholder="Create a password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="isTeacherAdmin"
              name="isTeacherAdmin"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={inputData.isTeacherAdmin}
              onChange={handleChange}
            />
            <label
              htmlFor="isTeacherAdmin"
              className="ml-2 block text-sm text-gray-800"
            >
              Register as Teacher/Admin
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="text-center">
          <a href="/" className="text-blue-600 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
