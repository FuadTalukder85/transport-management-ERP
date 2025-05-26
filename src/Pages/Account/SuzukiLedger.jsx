import { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { Toaster } from "react-hot-toast";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.vfs;

const SuzukiLedger = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            Suzuki Ledger
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
        {/* export and search */}
        <div className="md:flex justify-between items-center">
          <div className="flex gap-1 md:gap-3 text-primary font-semibold rounded-md">
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
        </div>

        {showFilter && (
          <div className="md:flex gap-6 justify-between border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-full">
              <label className="block mb-1 text-sm font-medium">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
            <div className="relative w-full">
              <label className="block mb-1 text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
        )}

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-900">
            <thead className="capitalize text-sm">
              <tr>
                <th className="border border-gray-700 px-2 py-1">SL.</th>
                <th className="border border-gray-700 px-2 py-1 min-w-[100px]">
                  Date
                </th>
                <th className="border border-gray-700 px-2 py-1">VehicleNo.</th>
                <th className="border border-gray-700 px-2 py-1">DealerName</th>
                <th className="border border-gray-700 px-2 py-1">Do(Si)</th>
                <th className="border border-gray-700 px-2 py-1">Co(U)</th>
                <th className="border border-gray-700 px-2 py-1">
                  Destination
                </th>
                <th className="border border-gray-700 px-2 py-1">Bike</th>
                <th className="border border-gray-700 px-2 py-1">Masking</th>
                <th className="border border-gray-700 px-2 py-1">
                  UnloadCharge
                </th>
                <th className="border border-gray-700 px-2 py-1">ExtraFare</th>
                <th className="border border-gray-700 px-2 py-1">
                  VehicleRent
                </th>
                <th className="border border-gray-700 px-2 py-1">10000</th>
                <th className="border border-gray-700 p-1 text-center">
                  BillAmount
                  <br />
                  with VAT & TAX
                </th>{" "}
                <th className="border border-gray-700 p-1 text-center">
                  Net Bill
                  <br />
                  Receivable after Tax
                </th>
                <th className="border border-gray-700 p-1 text-center">
                  ReceiveAmount
                </th>
                <th className="text-center border border-black py-1">
                  <p className="border-b">OpeningBalance 2000</p>
                  Balance
                </th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              <tr lassName="hover:bg-gray-50 transition-all">
                <td className="border border-gray-700 p-1 font-bold">1.</td>
                <td className="border border-gray-700 p-1 w-2xl min-w-[100px]">
                  25-05-2026
                </td>
                <td className="border border-gray-700 p-1">Motorcycle</td>
                <td className="border border-gray-700 p-1">Korim</td>
                <td className="border border-gray-700 p-1">1212</td>
                <td className="border border-gray-700 p-1">Chalan</td>
                <td className="border border-gray-700 p-1">Benapole</td>
                <td className="border border-gray-700 p-1">Gazipur</td>
                <td className="border border-gray-700 p-1">2</td>
                <td className="border border-gray-700 p-1">200</td>
                <td className="border border-gray-700 p-1"></td>
                <td className="border border-gray-700 p-1">500</td>
                <td className="border border-gray-700 p-1">400</td>
                <td className="border border-gray-700 p-1">100</td>
                <td className="border border-gray-700 p-1">120</td>
                <td className="border border-gray-700 p-1">140</td>
                <td className="border border-gray-700 p-1">200</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td
                  colSpan={13}
                  className="border border-black px-2 py-1 text-right"
                >
                  Total
                </td>
                <td className="border border-black px-2 py-1">
                  {/* {totalBodyFare} */}
                </td>
                <td className="border border-black px-2 py-1"></td>
                <td className="border border-black px-2 py-1">
                  {/* {totalFuelCost} */}
                </td>
                <td className="border border-black px-2 py-1"></td>
              </tr>
              <tr className="font-bold">
                <td colSpan={17} className="border border-black px-2 py-1">
                  Total Amount In Words (For Body Bill):{" "}
                  <span className="font-medium">
                    {/* {numberToWords(totalBodyFare)} */}
                  </span>
                </td>
              </tr>
              <tr className="font-bold">
                <td colSpan={17} className="border border-black px-2 py-1">
                  Total Amount In Words (For Fuel Bill):{" "}
                  <span className="font-medium">
                    {/* {numberToWords(totalFuelCost)} */}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuzukiLedger;
