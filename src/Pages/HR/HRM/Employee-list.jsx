import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch trips data
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/mstrading/api/employee/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setEmployee(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading employee...</p>;
  console.log("employee:", employee);
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUserSecret className="text-[#11375B] text-2xl" />
            Employee List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/tramessy/HR/HRM/AddEmployee">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Employee
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-2 py-3">SL.</th>
                <th className="px-2 py-3">Full Name</th>
                <th className="px-2 py-3">Email</th>
                <th className="px-2 py-3">Join Date</th>
                <th className="px-2 py-3">Designation</th>
                <th className="px-2 py-3">Gender</th>
                <th className="px-2 py-3">Mobile</th>
                <th className="px-2 py-3">Birth Date</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">Image</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {employee?.map((dt, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-50 transition-all">
                    <td className="px-2 py-4 font-bold">{index + 1}</td>
                    <td className="px-2 py-4">{dt.full_name}</td>
                    <td className="px-2 py-4">{dt.email}</td>
                    <td className="px-2 py-4">{dt.join_date}</td>
                    <td className="px-2 py-4">{dt.designation}</td>
                    <td className="px-2 py-4">{dt.gender}</td>
                    <td className="px-2 py-4">{dt.mobile}</td>
                    <td className="px-2 py-4">{dt.birth_date}</td>
                    <td className="px-2 py-4">{dt.address}</td>
                    <td className="px-2 py-4">{dt.image}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
