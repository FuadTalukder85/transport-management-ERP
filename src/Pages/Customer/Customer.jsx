import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch customer data
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/mstrading/api/customer/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setCustomer(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading customer...</p>;
  console.log("customer:", customer);
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUsers className="text-[#11375B] text-2xl" />
            All Customer information
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/tramessy/AddCustomer">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Add Customer
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-2 py-3">SL.</th>
                <th className="px-2 py-3">Name</th>
                <th className="px-2 py-3">Mobile</th>
                <th className="px-2 py-3">Email</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">DueBalance</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-2 py-3 action_column">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {customer?.map((dt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="px-4 py-4 font-bold">{index + 1}</td>
                  <td className="px-2 py-4">{dt.customer_name}</td>
                  <td className="px-2 py-4">{dt.mobile}</td>
                  <td className="px-2 py-4">{dt.email}</td>
                  <td className="px-2 py-4">{dt.address}</td>
                  <td className="px-2 py-4">{dt.due}</td>
                  <td className="px-2 py-4">{dt.status}</td>
                  <td className="px-2 action_column">
                    <div className="flex gap-1">
                      <Link to={`/tramessy/UpdateCustomerForm/${dt.id}`}>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Customer;
