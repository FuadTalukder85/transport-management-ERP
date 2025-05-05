import React from "react";
import { FaPlus } from "react-icons/fa6";
import { MdShop } from "react-icons/md";
import { Link } from "react-router-dom";

const Vendor = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <MdShop className="text-[#11375B] text-2xl" />
            Vendor List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/Inventory/AddVendor">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Vendor
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Name</th>
                <th className="px-2 py-3">Phone</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="px-2 py-4 font-bold">01</td>
                <td className="px-2 py-4">05-05-2025</td>
                <td className="px-2 py-4">Korim Mia</td>
                <td className="px-2 py-4">01756000000</td>
                <td className="px-2 py-4">Nikunja-02</td>
                <td className="px-2 py-4">Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
