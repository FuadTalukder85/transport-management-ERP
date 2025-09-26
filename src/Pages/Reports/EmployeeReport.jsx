import { useState } from "react";
import { FaFilter, FaUserSecret } from "react-icons/fa6";
import BtnCmn from "../../components/Button/BtnCmn";

const EmployeeReport = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-secondary flex items-center gap-3">
            <FaUserSecret className="text-2xl" />
            Employee List
          </h1>

          <div onClick={() => setShowFilter((prev) => !prev)}>
            <BtnCmn>
              <FaFilter /> Filter
            </BtnCmn>
          </div>
        </div>
        {/* export and search */}
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
          {/* search */}
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
        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-secondary capitalize">
              <tr className="">
                <th className="p-2">SL</th>
                <th className="p-2">Full Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Join Date</th>
                <th className="p-2">Designation</th>
                <th className="p-2">Gender</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Birth Date</th>
                <th className="p-2">Address</th>
                <th className="p-2">Image</th>
              </tr>
            </thead>
            <tbody className="text-secondary font-semibold bg-gray-100">
              <tr className="hover:bg-white transition-all border border-gray-200">
                <td className="p-2 font-bold">01</td>
                <td className="p-2">Korim Ali</td>
                <td className="p-2">korim@gmail.com</td>
                <td className="p-2">01-01-2024</td>
                <td className="p-2">Driver</td>
                <td className="p-2">Male</td>
                <td className="p-2">01756000000</td>
                <td className="p-2">01-01-1990</td>
                <td className="p-2">Nikunja-02</td>
                <td className="p-2">Image</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
