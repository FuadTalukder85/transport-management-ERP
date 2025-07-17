import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaEye, FaPen, FaPlus, FaUserSecret } from "react-icons/fa6";
import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const AttendanceList = () => {
  const [employee, setEmployee] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    // Fetch employee list
    fetch("https://api.tramessy.com/mstrading/api/employee/list")
      .then((response) => response.json())
      .then((data) => setEmployee(data.data))
      .catch((error) => console.error("Error fetching employee data:", error));

    // Fetch attendance list
    fetch("https://api.tramessy.com/mstrading/api/attendance/list")
      .then((response) => response.json())
      .then((data) => setAttendanceList(data.data))
      .catch((error) =>
        console.error("Error fetching attendance data:", error)
      );
  }, []);

  const handleViewClick = (id) => {
    setSelectedEmployeeId(id === selectedEmployeeId ? null : id);
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUserSecret className="text-[#11375B] text-2xl" />
            Attendance List
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/tramessy/HR/HRM/Attendance/AttendanceForm">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Attendance
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {employee.map((emp, index) => (
                <tr
                  key={emp.id}
                  className="hover:bg-gray-50 transition-all border border-gray-200"
                >
                  <td className="p-2 font-bold">{index + 1}</td>
                  <td className="p-2">{emp.full_name}</td>
                  <td className="p-2">{emp.join_date}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Link>
                        <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaPen className="text-[12px]" />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleViewClick(emp.id)}
                        className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer"
                      >
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

      {/* Modal */}
      {selectedEmployeeId && (
        <div className="fixed inset-0 bg-[#00000065] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 max-w-3xl w-full relative overflow-x-auto shadow-2xl border border-gray-300">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEmployeeId(null)}
              className="absolute top-2 right-2 text-white bg-primary hover:text-white hover:bg-red-500 rounded-md w-5 h-5 flex items-center justify-center transition-all cursor-pointer"
            >
              <IoCloseSharp />
            </button>

            {/* Modal Table */}
            <h2 className="text-lg font-bold text-center mb-4 text-primary">
              Attendance Details
            </h2>
            <table className="min-w-full text-sm text-left text-gray-900 mt-2">
              <thead className="capitalize text-sm">
                <tr>
                  <th className="border border-gray-700 px-2 py-1">SL.</th>
                  <th className="border border-gray-700 px-2 py-1">Date</th>
                  <th className="border border-gray-700 px-2 py-1">
                    Employee Name
                  </th>
                  <th className="border border-gray-700 px-2 py-1 text-center">
                    Present
                  </th>
                  <th className="border border-gray-700 px-2 py-1 text-center">
                    Absent
                  </th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {attendanceList
                  .filter(
                    (att) => att.employee_id === String(selectedEmployeeId)
                  )
                  .map((att, index) => {
                    const emp = employee.find(
                      (e) => String(e.id) === String(att.employee_id)
                    );
                    return (
                      <tr
                        key={att.id}
                        className="hover:bg-gray-50 transition-all"
                      >
                        <td className="border border-gray-700 p-1 font-bold">
                          {index + 1}.
                        </td>
                        <td className="border border-gray-700 p-1">
                          {att.date}
                        </td>
                        <td className="border border-gray-700 p-1">
                          {emp?.full_name || "N/A"}
                        </td>
                        <td className="border border-gray-700 p-1 text-center">
                          {att.present === "1" ? (
                            <span className="text-green-600">
                              <FaCheck />
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="border border-gray-700 p-1 text-center">
                          {att.absent === "1" ? (
                            <span className="text-red-600">
                              <IoCloseOutline />
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
