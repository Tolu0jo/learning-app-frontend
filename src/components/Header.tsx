"use client";
import React from "react";

const Header: React.FC = () => {
  const onLogout = () => {};
  return (
    <header className="sticky top-0 bg-white shadow-md p-4 lg:px-20 lg:py-4 flex items-center justify-between z-50">
      <h1 className="text-2xl font-bold text-blue-600">
        Learning<span className=" text-gray-600">App</span>
      </h1>
      <button
        onClick={onLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
