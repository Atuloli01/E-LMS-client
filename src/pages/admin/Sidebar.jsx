import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ChartNoAxesColumn, SquareLibrary, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300 h-screen bg-white dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 p-4`}
      >
        {/* Sidebar Content */}
        <div className="space-y-6 mt-14">
          <Link
            to="dashboard"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <ChartNoAxesColumn size={22} />
            {isOpen && <span className="font-semibold">Dashboard</span>}
          </Link>
          <Link
            to="dashboard-alt"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <ChartNoAxesColumn size={22} />
            {isOpen && <span className="font-semibold">Analytics</span>}
          </Link>
          <Link
            to="course"
            className="flex items-center gap-2 hover:text-blue-600 transition"
          >
            <SquareLibrary size={22} />
            {isOpen && <span className="font-semibold">Courses</span>}
          </Link>
        </div>
      </div>

      {/* Toggle Button on the LEFT side */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-2 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md border border-gray-300 dark:border-gray-600"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
