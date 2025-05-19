import { Toaster } from "react-hot-toast";
import { FaEye, FaPen, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineArrowDropDown } from "react-icons/md";

const PaymentReceive = () => {
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-2 overflow-hidden">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden  max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
            Payment Receive
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/tramessy/account/PaymentReceiveForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Add
              </button>
            </Link>
          </div>
        </div>

        {/* Export */}
        <div className="md:flex items-center justify-between mb-4">
          <div className="flex gap-1 md:gap-3 flex-wrap">
            <div className="py-2 px-5 bg-gray-200 text-primary font-semibold rounded-md hover:bg-primary hover:text-white transition-all">
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
            <div className="relative w-full">
              <label className="text-primary text-sm font-semibold">
                Select Branch Ledger
              </label>
              <select className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
                <option value="">Select branch</option>
                <option value="Abdullahpur">Abdullahpur</option>
                <option value="Narayanganj">Narayanganj</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="text-black capitalize font-bold">
              <tr>
                <th className="border border-gray-700 px-2 py-3">SL</th>
                <th className="border border-gray-700 px-2 py-3">Date</th>
                <th className="border border-gray-700 px-2 py-3">
                  Particulars
                </th>
                <th className="border border-gray-700 px-2 py-3">Mode</th>
                <th className="border border-gray-700 px-2 py-3">
                  Destination
                </th>
                <th className="border border-gray-700 px-2 py-3">TripExp</th>
                <th className="border border-gray-700 px-2 py-3">Due</th>
                <th className="border border-gray-700 px-2 py-3">CashIn</th>
                <th className="border border-gray-700 px-2 py-3">CashOut</th>
                <th className="border border-gray-700 px-2 py-3">Balance</th>
                <th className="border border-gray-700 px-2 py-3">Ref</th>
                <th className="border border-gray-700 px-2 py-3">Status</th>
                <th className="border border-gray-700 px-2 py-3 action_column">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-black font-semibold">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="border border-gray-700 px-2 py-4 font-bold">
                  1.
                </td>
                <td className="border border-gray-700 px-2 py-4">12-05-2025</td>
                <td className="border border-gray-700 px-2 py-4">Furniture</td>
                <td className="border border-gray-700 px-2 py-4">Cash</td>
                <td className="border border-gray-700 px-2 py-4">Dhaka</td>
                <td className="border border-gray-700 px-2 py-4">2000</td>
                <td className="border border-gray-700 px-2 py-4">500</td>
                <td className="border border-gray-700 px-2 py-4">5000</td>
                <td className="border border-gray-700 px-2 py-4">3000</td>
                <td className="border border-gray-700 px-2 py-4">2000</td>
                <td className="border border-gray-700 px-2 py-4">Korim</td>
                <td className="border border-gray-700 px-2 py-4">
                  <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                    Active
                  </span>
                </td>
                <td className="border border-gray-700 px-2 action_column">
                  <div className="flex gap-1">
                    <Link>
                      <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaPen className="text-[12px]" />
                      </button>
                    </Link>
                    <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                      <FaEye className="text-[12px]" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default PaymentReceive;
