import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { HiCurrencyBangladeshi } from "react-icons/hi2";

const Suzuki = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <HiCurrencyBangladeshi className="text-[#11375B] text-2xl" />
            Billing Suzuki
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

        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-64">
              <input
                type="date"
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
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-2 py-3">SL</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">VehicleNo.</th>
                <th className="px-2 py-3">DealerName</th>
                <th className="px-2 py-3">Do(Si)</th>
                <th className="px-2 py-3">Co(U)</th>
                <th className="px-2 py-3">Destination</th>
                <th className="px-2 py-3">Bike</th>
                <th className="px-2 py-3">Masking</th>
                <th className="px-2 py-3">UnloadCharge</th>
                <th className="px-2 py-3">ExtraFare</th>
                <th className="px-2 py-3">VehicleRent</th>
                <th className="px-2 py-3">TotalRent</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="px-2 py-4 font-bold">01</td>
                <td className="px-2 py-4">02-02-2025</td>
                <td className="px-2 py-4">DH-4515</td>
                <td className="px-2 py-4">Korim Mis</td>
                <td className="px-2 py-4">5555</td>
                <td className="px-2 py-4">2222</td>
                <td className="px-2 py-4">Gazipur</td>
                <td className="px-2 py-4">Suzuki</td>
                <td className="px-2 py-4">11111</td>
                <td className="px-2 py-4">500</td>
                <td className="px-2 py-4">2500</td>
                <td className="px-2 py-4">1000</td>
                <td className="px-2 py-4">4000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Suzuki;
