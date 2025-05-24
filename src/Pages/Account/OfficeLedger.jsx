import { Toaster } from "react-hot-toast";
import { FaEye, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SelectField } from "../../components/Form/FormFields";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const OfficeLedger = () => {
  const [branch, setbranch] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/mstrading/api/branch/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setbranch(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading data...</p>;
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-2 overflow-hidden">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden  max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-[#11375B] capitalize flex items-center gap-3">
            OFFICE ledger
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
        <div className="w-full mt-5 overflow-x-auto border border-gray-200">
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
              </tr>
            </thead>
            <tbody className="text-black font-semibold">
              {branch?.map((dt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="border border-gray-700 px-2 py-4 font-bold">
                    {index + 1}.
                  </td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.date}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.remarks ? (
                      dt.remarks
                    ) : (
                      <span className="flex justify-center items-center">
                        --
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.mode ? (
                      dt.mode
                    ) : (
                      <span className="flex justify-center items-center">
                        --
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.destination ? (
                      dt.destination
                    ) : (
                      <span className="flex justify-center items-center">
                        --
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.trip_expense ? (
                      dt.trip_expense
                    ) : (
                      <span className="flex justify-center items-center">
                        --
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">{dt.due}</td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.cash_in}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.cash_out}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">
                    {dt.balance}
                  </td>
                  <td className="border border-gray-700 px-2 py-4">{dt.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default OfficeLedger;
