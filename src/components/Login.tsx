import React from 'react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 p-6 bg-white rounded-lg shadow-md sm:space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 sm:text-3xl">Login</h2>
        <form className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
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
