import { useState } from "react";
import { FaTruck, FaPlus, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const TripReport = () => {
  const [showFilter, setShowFilter] = useState(false);
  // Date filter state
  const [startDate, setStartDate] = useState("");

  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaTruck className="text-[#11375B] text-2xl" />
            Trip Records
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/AddTripForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Trip
              </button>
            </Link>
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <FaFilter /> Filter
            </button>
          </div>
        </div>
        {/* export and search */}
        <div className="md:flex justify-between items-center">
          <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
            <div
              filename={"trip_data.csv"}
              className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              CSV
            </div>
            <button className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Excel
            </button>
            <button className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              PDF
            </button>
            <button className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer">
              Print
            </button>
          </div>
          {/* search */}
          <div className="mt-3 md:mt-0">
            <span className="text-primary font-semibold pr-3">Search: </span>
            <input
              placeholder="Search..."
              className="border border-gray-300 rounded-md outline-none text-xs py-2 ps-2 pr-5"
            />
          </div>
        </div>
        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-64">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="relative w-64">
              <input
                type="date"
                placeholder="End date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="mt-3 md:mt-0 flex gap-2">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaFilter /> Filter
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white uppercase text-sm">
              <tr>
                <th className="px-2 py-3">#</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Driver Info</th>
                <th className="px-2 py-3">Trip & Destination</th>
                <th className="px-2 py-3">Trip Cost</th>
                <th className="px-2 py-3">Trip Fare</th>
                <th className="px-2 py-3">Total Profit</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all border-b border-gray-300">
                <td className="px-2 py-3 font-bold">1</td>
                <td className="px-2 py-3">05-05-2025</td>
                <td className="px-2 py-3">
                  <p>Name: Korim Mia</p>
                  <p>Mobile: 01750000000</p>
                  <p>Commission: 200</p>
                </td>
                <td className="px-2 py-4">
                  <p>Date: 05-05-2025</p>
                  <p>Load Point: Dhaka</p>
                  <p>Unload Point: Faridpur</p>
                  <p>Trip Time: 10 am</p>
                </td>
                <td className="px-2 py-3">250</td>
                <td className="px-2 py-3">80</td>
                <td className="px-2 py-3">20000.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default TripReport;
