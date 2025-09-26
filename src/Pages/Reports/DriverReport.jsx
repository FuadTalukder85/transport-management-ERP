import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaFileExcel,
  FaFilePdf,
  FaFilter,
  FaPrint,
  FaUser,
} from "react-icons/fa6";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import BtnCmn from "../../components/Button/BtnCmn";

const DriverReport = () => {
  const [drivers, setDrivers] = useState([]);
  const [trips, setTrips] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch drivers and trips data
  useEffect(() => {
    setLoading(true);
    const fetchDrivers = axios.get(
      `https://api.tramessy.com/mstrading/api/driver/list`
    );
    const fetchTrips = axios.get(
      `https://api.tramessy.com/mstrading/api/trip/list`
    );

    Promise.all([fetchDrivers, fetchTrips])
      .then(([driverRes, tripRes]) => {
        setDrivers(driverRes?.data?.data ?? []);
        setTrips(tripRes?.data?.data ?? []);
      })
      .catch((err) => {
        console.error("Failed to fetch data", err);
        setDrivers([]);
        setTrips([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [startDate, endDate]);

  // Filter trips by date range
  const tripsFiltered = Array.isArray(trips)
    ? trips.filter((t) => {
        const tripDate = new Date(t.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || tripDate >= start) && (!end || tripDate <= end);
      })
    : [];

  // Process driver statistics
  const driverStats = Array.isArray(drivers)
    ? drivers
        .map((driver) => {
          const dt = tripsFiltered.filter(
            (t) => t.driver_name === driver.driver_name
          );
          const totalTrips = dt.length;
          const totalRent = dt.reduce(
            (sum, t) => sum + Number(t.total_rent || 0),
            0
          );
          const totalExp = dt.reduce(
            (sum, t) => sum + Number(t.total_exp || 0),
            0
          );
          return {
            name: driver.driver_name,
            mobile: driver.driver_mobile,
            totalTrips,
            totalRent,
            totalExp,
            totalProfit: totalRent - totalExp,
          };
        })
        .filter(
          (driver) =>
            driver.totalTrips > 0 || driver.totalRent > 0 || driver.totalExp > 0
        )
    : [];

  // Export to Excel
  const exportExcel = () => {
    const data = driverStats.map((d, i) => ({
      SL: i + 1,
      Driver: d.name,
      Mobile: d.mobile,
      Trips: d.totalTrips,
      Rent: d.totalRent,
      Expense: d.totalExp,
      Profit: d.totalProfit,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DriverReport");
    XLSX.writeFile(wb, "Driver_Report.xlsx");
  };

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF("landscape");
    const head = [
      ["SL", "Driver", "Mobile", "Trips", "Rent", "Expense", "Profit"],
    ];
    const body = driverStats.map((d, i) => [
      i + 1,
      d.name,
      d.mobile,
      d.totalTrips,
      d.totalRent,
      d.totalExp,
      d.totalProfit,
    ]);
    autoTable(doc, { head, body, theme: "grid" });
    doc.save("Driver_Report.pdf");
  };

  // Print
  const printReport = () => {
    const html = document.getElementById("driver-report").outerHTML;
    const w = window.open("", "", "width=900,height=650");
    w.document.write(
      `<html><head><title>Driver Report</title>
      <style>table{width:100%;border-collapse:collapse;}th,td{border:1px solid #ccc;padding:6px}thead{background:#11375B;color:#fff}</style>
      </head><body><h3>Driver Report</h3>${html}</body></html>`
    );
    w.document.close();
    w.print();
    w.close();
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDriverReport = driverStats.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(driverStats.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePageClick = (number) => {
    setCurrentPage(number);
  };

  // Loading state
  if (loading)
    return (
      <div>
        <div className="text-center py-10 text-gray-500">
          <div className="flex justify-center items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent animate-spin rounded-full" />
            Loading Driver report...
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white shadow rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-secondary flex items-center gap-2 ">
        <FaUser className="text-lg" />
        Driver Performance Report
      </h2>

      {/* Buttons */}
      <div className="flex items-center justify-between my-6 ">
        <div className="flex flex-wrap md:flex-row gap-3">
          <button
            onClick={exportExcel}
            className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-green-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
          >
            <FaFileExcel />
            Excel
          </button>
          <button
            onClick={exportPDF}
            className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-amber-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
          >
            <FaFilePdf />
            PDF
          </button>
          <button
            onClick={printReport}
            className="flex items-center gap-2 py-2 px-5 hover:bg-primary bg-gray-50 shadow-md shadow-blue-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
          >
            <FaPrint />
            Print
          </button>
        </div>
        <div onClick={() => setShowFilter((prev) => !prev)}>
          <BtnCmn>
            <FaFilter /> Filter
          </BtnCmn>
        </div>
      </div>

      {/* Filter UI */}
      {showFilter && (
        <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
          <div className="relative w-full">
            <label className="block mb-1 text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="relative w-full">
            <label className="block mb-1 text-sm font-medium">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
      )}

      {/* Report Table */}
      <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
        <table id="driver-report" className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-secondary capitalize">
            <tr>
              <th className="p-2">SL</th>
              <th className="p-2">Driver</th>
              <th className="p-2">Mobile</th>
              <th className="p-2">Trips</th>
              <th className="p-2">Rent</th>
              <th className="p-2">Expense</th>
              <th className="p-2">Profit</th>
            </tr>
          </thead>
          <tbody className="text-secondary bg-gray-100">
            {currentDriverReport.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-10 text-gray-500 italic"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-300 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 9.75L14.25 14.25M9.75 14.25L14.25 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    No report data found.
                  </div>
                </td>
              </tr>
            ) : (
              currentDriverReport.map((d, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-2 py-3">{i + 1 + indexOfFirstItem}.</td>
                  <td className="px-2 py-3">{d.name}</td>
                  <td className="px-2 py-3">{d.mobile}</td>
                  <td className="px-2 py-3">{d.totalTrips}</td>
                  <td className="px-2 py-3">{d.totalRent}</td>
                  <td className="px-2 py-3">{d.totalExp}</td>
                  <td>{d.totalProfit}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {currentDriverReport.length > 0 && (
        <div className="mt-10 flex justify-center">
          <div className="space-x-2 flex items-center">
            <button
              onClick={handlePrevPage}
              className={`p-2 ${
                currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
              } rounded-sm`}
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => handlePageClick(number + 1)}
                className={`px-3 py-1 rounded-sm ${
                  currentPage === number + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-primary hover:text-white"
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className={`p-2 ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-primary text-white"
              } rounded-sm`}
              disabled={currentPage === totalPages}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverReport;
