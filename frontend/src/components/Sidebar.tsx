import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFlask, FaDatabase, FaChartLine } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-4 font-bold text-xl border-b border-gray-700">
        ML Dashboard
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <Link to="/" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaHome /> Home
        </Link>
        <Link to="/experiments" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaFlask /> Experiments
        </Link>
        <Link to="/models" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaDatabase /> Models
        </Link>
        <Link to="/metrics" className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
          <FaChartLine /> Metrics
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
