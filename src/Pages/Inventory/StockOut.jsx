import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdShop } from "react-icons/md";
import { Link } from "react-router-dom";

const StockOut = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/stockOutProduct/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setStock(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading data...</p>;
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <MdShop className="text-[#11375B] text-2xl" />
            Stock Out List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/Inventory/StockOutForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Stock Out
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="p-2">SL.</th>
                <th className="p-2">Product ID</th>
                <th className="p-2">Date</th>
                <th className="p-2">Vehicle Name</th>
                <th className="p-2">Driver Name</th>
                <th className="p-2">Product Category</th>
                <th className="p-2">Stock In</th>
                <th className="p-2">Stock Out</th>
                <th className="p-2">Current Stock</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {stock?.map((dt, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-all border border-gray-200"
                >
                  <td className="p-2 font-bold">{i + 1}</td>
                  <td className="p-2 font-bold">{dt.purchase_id}</td>
                  <td className="p-2">{dt.date}</td>
                  <td className="p-2">{dt.vehicle_name}</td>
                  <td className="p-2">{dt.driver_name}</td>
                  <td className="p-2">Engine Oil</td>
                  <td className="p-2">{dt.stock_in}</td>
                  <td className="p-2">{dt.stock_out}</td>
                  <td className="p-2">{dt.total_stock}</td>
                  <td className="px-2 action_column">
                    {dt.stock_in ? (
                      ""
                    ) : (
                      <div className="flex gap-1">
                        <Link>
                          <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                            <FaPen className="text-[12px]" />
                          </button>
                        </Link>
                        <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaEye className="text-[12px]" />
                        </button>
                        <button className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaTrashAlt className="text-[12px]" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockOut;
