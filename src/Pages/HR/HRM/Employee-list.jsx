import React from "react";
import { FaPlus, FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUserSecret className="text-[#11375B] text-2xl" />
            Employee List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/tramessy/HR/HRM/AddEmployee">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Employee
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">Full Name</th>
                <th className="px-2 py-3">Email</th>
                <th className="px-2 py-3">Join Date</th>
                <th className="px-2 py-3">Designation</th>
                <th className="px-2 py-3">Gender</th>
                <th className="px-2 py-3">Mobile</th>
                <th className="px-2 py-3">Birth Date</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">Image</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="px-2 py-4 font-bold">01</td>
                <td className="px-2 py-4">Korim Ali</td>
                <td className="px-2 py-4">korim@gmail.com</td>
                <td className="px-2 py-4">01-01-2024</td>
                <td className="px-2 py-4">Driver</td>
                <td className="px-2 py-4">Male</td>
                <td className="px-2 py-4">01756000000</td>
                <td className="px-2 py-4">01-01-1990</td>
                <td className="px-2 py-4">Nikunja-02</td>
                <td className="px-2 py-4">Image</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
