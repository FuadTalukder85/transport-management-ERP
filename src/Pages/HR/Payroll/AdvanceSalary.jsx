import React from "react";
import { FaPlus, FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";
import BtnCmn from "../../../components/Button/BtnCmn";

const AdvanceSalary = () => {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-secondary flex items-center gap-3">
            <FaUserSecret className="text-2xl" />
            Advance Salary
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/HRM/Payroll/Advance-Salary-Form">
              <BtnCmn>
                <FaPlus /> Advance
              </BtnCmn>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-secondary capitalize">
              <tr>
                <th className="p-2">SL</th>
                <th className="p-2">Name</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Salary Month</th>
                {/* <th className="px-2 py-3">Action</th> */}
              </tr>
            </thead>
            <tbody className="text-secondary font-semibold bg-gray-100">
              <tr className="hover:bg-gray-50 transition-all border border-gray-200">
                <td className="p-2 font-bold">01</td>
                <td className="p-2">Korim Ali</td>
                <td className="p-2">10,000</td>
                <td className="p-2">5 April 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvanceSalary;
