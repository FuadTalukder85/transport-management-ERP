import { Toaster } from "react-hot-toast";
import { FaEye, FaPen } from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";

const CustomerLedger = () => {
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-2 overflow-hidden">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden  max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
            {/* <FaTruck className="text-[#11375B] text-2xl" /> */}
            Customer ledger
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2"></div>
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
                Select Customer Ledger
              </label>
              <select className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
                <option value="">Select customer</option>
                <option value="Korim Mia">Korim Mia</option>
                <option value="Selim Ali">Selim Ali</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-[1030px] mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="text-sm text-left">
            <thead className="text-black capitalize font-bold">
              <tr>
                <th className="border border-gray-700 px-2 py-3">SL</th>
                <th className="border border-gray-700 px-2 py-3">BillDate</th>
                <th className="border border-gray-700 px-2 py-3">
                  WorkingDate
                </th>
                <th className="border border-gray-700 px-2 py-3">
                  CustomerName
                </th>
                <th className="border border-gray-700 px-2 py-3">VehicleNo</th>
                <th className="border border-gray-700 px-2 py-3">LoadPoint</th>
                <th className="border border-gray-700 px-2 py-3">
                  UnloadPoint
                </th>
                <th className="border border-gray-700 px-2 py-3">Quantity</th>
                <th className="border border-gray-700 px-2 py-3">BillAmount</th>
                <th className="border border-gray-700 px-2 py-3">Vat</th>
                <th className="border border-gray-700 px-2 py-3">
                  TotalAmount
                </th>
                <th className="border border-gray-700 px-2 py-3">DueAmount</th>
                <th className="border border-gray-700 px-2 py-3">Status</th>
                {/* <th className="border border-gray-700 px-2 py-3 action_column">
                  Action
                </th> */}
              </tr>
            </thead>
            <tbody className="text-black font-semibold">
              <tr className="hover:bg-gray-50 transition-all">
                <td className="border border-gray-700 px-2 py-4 font-bold">
                  1.
                </td>
                <td className="border border-gray-700 px-2 py-4">12-05-2025</td>
                <td className="border border-gray-700 px-2 py-4">12-05-2025</td>
                <td className="border border-gray-700 px-2 py-4">Korim Mia</td>
                <td className="border border-gray-700 px-2 py-4">12-2525</td>
                <td className="border border-gray-700 px-2 py-4">Dhaka</td>
                <td className="border border-gray-700 px-2 py-4">Gazipur</td>
                <td className="border border-gray-700 px-2 py-4">5</td>
                <td className="border border-gray-700 px-2 py-4">500</td>
                <td className="border border-gray-700 px-2 py-4">15</td>
                <td className="border border-gray-700 px-2 py-4">5000</td>
                <td className="border border-gray-700 px-2 py-4">
                  500 <p>Opening balance: 2000</p>
                </td>
                <td className="border border-gray-700 px-2 py-4">
                  <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                    Active
                  </span>
                </td>
                {/* <td className="border border-gray-700 px-2 action_column">
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
                </td> */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default CustomerLedger;
