import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { Link } from "react-router-dom";
import BtnCmn from "../../components/Button/BtnCmn";

const Leave = () => {
  const [leave, setLeave] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch leave data
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/leave/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setLeave(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trip data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) return <p className="text-center mt-16">Loading leave...</p>;
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-secondary flex items-center gap-3">
            <MdOutlineAirplaneTicket className="text-2xl" />
            Leave List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/HR/HRM/LeaveForm">
              <BtnCmn>
                <FaPlus /> Leave
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
                <th className="p-2">Apply Date</th>
                <th className="p-2">Leave Form</th>
                <th className="p-2">Leave To</th>
                <th className="p-2">Leave Type</th>
                <th className="p-2">Remark</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-secondary font-semibold bg-gray-100">
              {leave?.map((dt, index) => (
                <tr className="hover:bg-gray-50 transition-all border border-gray-200">
                  <td className="p-2 font-bold">{index + 1}.</td>
                  <td className="p-2">{dt.name}</td>
                  <td className="p-2">{dt.apply_date}</td>
                  <td className="p-2">{dt.leave_from}</td>
                  <td className="p-2">{dt.leave_to}</td>
                  <td className="p-2">{dt.leave_type}</td>
                  <td className="p-2">{dt.remark}</td>
                  <td className="p-2">{dt.status}</td>
                  <td className="px-2 action_column">
                    <div className="flex gap-1">
                      <Link to={`/UpdateLeaveForm/${dt.id}`}>
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

export default Leave;
