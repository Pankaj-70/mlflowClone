import React from "react";
import { FaUserCircle, FaBell } from "react-icons/fa";

const Topbar: React.FC = () => {
  return (
    <div className="h-14 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h1 className="text-lg font-semibold">Machine Learning Dashboard</h1>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-500 text-xl cursor-pointer" />
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Topbar;
