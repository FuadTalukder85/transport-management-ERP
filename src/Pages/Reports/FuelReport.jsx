import { useState } from "react";
import { FaTruck, FaFilter } from "react-icons/fa";
import BtnCmn from "../../components/Button/BtnCmn";

const FuelReport = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-secondary flex items-center gap-3">
            Fuel Account
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <div onClick={() => setShowFilter((prev) => !prev)}>
              <BtnCmn>
                <FaFilter /> Filter
              </BtnCmn>
            </div>
          </div>
        </div>
        {/* export */}
        <div className="md:flex justify-between items-center">
          <div className="flex gap-1 md:gap-3 text-secondary font-semibold rounded-md">
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
          {/*  */}
          <div className="mt-3 md:mt-0">
            <span className="text-secondary font-semibold pr-3">Search: </span>
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
        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-secondary capitalize">
              <tr>
                <th className="p-2">SL</th>
                <th className="p-2">Driver's Name</th>
                <th className="p-2">Vehicle No.</th>
                <th className="p-2">Fuel Type</th>
                <th className="p-2">Fueling Date</th>
                <th className="p-2">Gallon/Liter</th>
                <th className="p-2">Cost per Liter</th>
                <th className="p-2">Total Cost</th>
              </tr>
            </thead>
            <tbody className="text-secondary font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all border border-gray-200">
                <td className="p-2 font-bold">1</td>
                <td className="p-2">Driver Name</td>
                <td className="p-2">12-1526</td>
                <td className="p-2">Octan</td>
                <td className="p-2">05-05-2025</td>
                <td className="p-2">15</td>
                <td className="p-2">20</td>
                <td className="p-2">300.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default FuelReport;
