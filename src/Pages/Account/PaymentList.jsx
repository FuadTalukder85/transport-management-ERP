import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaUserSecret } from "react-icons/fa6";

const PaymentList = () => {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/mstrading/api/payment/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setPayment(response.data.data);
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
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUserSecret className="text-[#11375B] text-2xl" />
            Payment List
          </h1>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-1 py-3">SL.</th>
                <th className="px-1 py-3">Date</th>
                <th className="px-1 py-3">SupplierName</th>
                <th className="px-1 py-3">Category</th>
                <th className="px-1 py-3">ItemName</th>
                <th className="px-1 py-3">Quantity</th>
                <th className="px-1 py-3">UnitPrice</th>
                <th className="px-1 py-3">TotalAmount</th>
                <th className="px-1 py-3">PayAmount</th>
                <th className="px-1 py-3">DueAmount</th>
                <th className="px-1 py-3">Status</th>
                <th className="px-1 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {payment?.map((dt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="px-1 py-4 font-bold">{index + 1}</td>
                  <td className="px-1 py-4">{dt.date}</td>
                  <td className="px-1 py-4">{dt.supplier_name}</td>
                  <td className="px-1 py-4">{dt.category}</td>
                  <td className="px-1 py-4">{dt.item_name}</td>
                  <td className="px-1 py-4">{dt.quantity}</td>
                  <td className="px-1 py-4">{dt.unit_price}</td>
                  <td className="px-1 py-4">{dt.total_amount}</td>
                  <td className="px-1 py-4">{dt.main_amount}</td>
                  <td className="px-1 py-4">{dt.due_amount}</td>

                  <td className="px-1 py-4">
                    <span className="text-white bg-green-700 px-3 py-1 rounded-md text-xs font-semibold">
                      {dt.status}
                    </span>
                  </td>

                  <td className="px-1 action_column">
                    <div className="flex gap-1">
                      <button className="text-primary hover:bg-primary hover:text-white px-1 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaEye className="text-[12px]" />
                      </button>
                    </div>
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

export default PaymentList;
