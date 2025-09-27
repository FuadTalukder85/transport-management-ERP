import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import BtnCmn from "../../components/Button/BtnCmn";

const PaymentReceive = () => {
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch payment data
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/paymentRecived/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setPayment(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading payment...</p>;
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-secondary flex items-center gap-3">
            Payment Receive
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/account/PaymentReceiveForm">
              <BtnCmn>
                <FaPlus /> payment
              </BtnCmn>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-secondary capitalize">
              <tr>
                <th className="p-2">SL.</th>
                <th className="p-2">Date</th>
                <th className="p-2">CustomerName</th>
                <th className="p-2">BranchName</th>
                <th className="p-2">BillRef</th>
                <th className="p-2">Amount</th>
                <th className="p-2">CashType</th>
                <th className="p-2">Note</th>
                <th className="p-2">CreatedBy</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-secondary font-semibold bg-gray-100">
              {payment?.map((dt, index) => (
                <tr className="hover:bg-gray-50 transition-all border border-gray-200">
                  <td className="px-2 py-1 font-bold">{index + 1}.</td>
                  <td className="px-2 py-1">{dt.date}</td>
                  <td className="px-2 py-1">{dt.customer_name}</td>
                  <td className="px-2 py-1">{dt.branch_name}</td>
                  <td className="px-2 py-1">{dt.bill_ref}</td>
                  <td className="px-2 py-1">{dt.amount}</td>
                  <td className="px-2 py-1">{dt.cash_type}</td>
                  <td className="px-2 py-1">{dt.note}</td>
                  <td className="px-2 py-1">{dt.created_by}</td>
                  <td className="px-2 py-1">{dt.status}</td>
                  <td className="px-2 action_column">
                    <div className="flex gap-1">
                      <Link to={`/UpdatepaymentForm/${dt.id}`}>
                        <button className="text-secondary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaPen className="text-[12px]" />
                        </button>
                      </Link>
                      <button
                        // onClick={() => {
                        //   setSelectedEmployeeId(dt.id);
                        //   setIsOpen(true);
                        // }}
                        className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer"
                      >
                        <FaTrashAlt className="text-[12px]" />
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

export default PaymentReceive;
