import { useState } from "react";
import { FaFilter, FaTruck } from "react-icons/fa6";

const DriverReport = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            Driver List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>

        {/* Export */}
        <div className="md:flex justify-between mb-4">
          <div className="flex gap-1 md:gap-3 flex-wrap">
            <div
              filename="drivers.csv"
              className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all"
            >
              CSV
            </div>
            <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
              Excel
            </button>
            <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
              PDF
            </button>
            <button className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all cursor-pointer">
              Print
            </button>
          </div>
          <div className="mt-3 md:mt-0">
            <span className="text-primary font-semibold pr-3">Search: </span>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
            />
          </div>
        </div>
        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-full">
              <input
                type="date"
                placeholder="Start date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="relative w-full">
              <input
                type="date"
                placeholder="End date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
        )}
        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">Name</th>
                <th className="px-2 py-3">Mobile</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">Emergency</th>
                <th className="px-2 py-3">License</th>
                <th className="px-2 py-3">Expired</th>
                <th className="px-2 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="px-2 py-4 font-bold">1</td>
                <td className="px-2 py-4">Korim Mia</td>
                <td className="px-2 py-4">01756000000</td>
                <td className="px-2 py-4">Nikunja - 02</td>
                <td className="px-2 py-4">0150000000</td>
                <td className="px-2 py-4">1210DA</td>
                <td className="px-2 py-4">15-12-2026</td>
                <td className="px-2 py-4">
                  <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default DriverReport;
