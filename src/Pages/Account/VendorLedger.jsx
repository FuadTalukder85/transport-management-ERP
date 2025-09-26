import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const VendorLedger = () => {
  const [vendorData, setVendorData] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/vendorLedger/list")
      .then((res) => {
        if (res.data.status === "Success") {
          const onlyVendorRows = res.data.data.filter((v) => !!v.vendor_name);
          setVendorData(onlyVendorRows);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Vendor ledger error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-16">Loading Vendor Ledger...</p>;

  const vendorNames = [...new Set(vendorData.map((v) => v.vendor_name))];
  const filteredVendors = selectedVendor
    ? vendorData.filter((v) => v.vendor_name === selectedVendor)
    : vendorData;

  const totals = filteredVendors.reduce(
    (acc, item) => {
      acc.rent += Number(item.trip_rent || 0);
      acc.advance += Number(item.advance || 0);
      acc.due += Number(item.due_amount || 0);
      return acc;
    },
    { rent: 0, advance: 0, due: 0 }
  );

  // Export to Excel
  const exportToExcel = () => {
    const data = filteredVendors.map((item) => ({
      Date: item.date,
      Vendor: item.customer,
      Load: item.load_point,
      Unload: item.unload_point,
      Vehicle: item.vehicle_no,
      Driver: item.driver_name,
      TripRent: item.trip_rent,
      Advance: item.advance,
      Due: item.due_amount,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vendor Ledger");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    saveAs(blob, `Vendor_Ledger_${selectedVendor || "All"}.xlsx`);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF("landscape");
    const columns = [
      "SL.",
      "Date",
      "Vendor",
      "Load",
      "Unload",
      "Vehicle",
      "Driver",
      "Trip Rent",
      "Advance",
      "Due",
    ];
    const rows = filteredVendors.map((item, idx) => [
      idx + 1,
      item.date,
      item.customer,
      item.load_point,
      item.unload_point,
      item.vehicle_no,
      item.driver_name,
      item.trip_rent,
      item.advance,
      item.due_amount,
    ]);
    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 20,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [17, 55, 91], textColor: [255, 255, 255] },
    });
    doc.save(`Vendor_Ledger_${selectedVendor || "All"}.pdf`);
  };

  const printTable = () => {
    const content = document.getElementById("vendor-ledger-table").innerHTML;
    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Vendor Ledger</title>
          <style>
            table, th, td {
              border: 1px solid black;
              border-collapse: collapse;
            }
            th, td {
              padding: 4px;
              font-size: 12px;
            }
            table {
              width: 100%;
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  console.log("vendorData", vendorData);
  return (
    <div className="border border-gray-200 md:p-4 rounded-xl">
      <div className="overflow-x-auto max-w-5xl mx-auto">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-secondary capitalize">
            Vendor Ledger: {selectedVendor || "All Vendors"}
          </h1>
        </div>

        <div className="md:flex items-center justify-between mb-4">
          <div className="flex gap-2 flex-wrap text-secondary font-semibold">
            <button
              onClick={exportToExcel}
              className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              Excel
            </button>

            <button
              onClick={exportToPDF}
              className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              PDF
            </button>

            <button
              onClick={printTable}
              className="py-2 px-5 hover:bg-primary bg-gray-200 hover:text-white rounded-md transition-all duration-300 cursor-pointer"
            >
              Print
            </button>
          </div>
          <div className="mt-3 md:mt-0 relative">
            <label className="text-secondary text-sm font-semibold">
              Select Vendor
            </label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="mt-1 w-full text-gray-600 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
            >
              <option value="">All Vendors</option>
              {vendorNames.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
          </div>
        </div>

        <div id="vendor-ledger-table" className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-secondary">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Vendor</th>
                <th className="border px-2 py-1">Load</th>
                <th className="border px-2 py-1">Unload</th>
                <th className="border px-2 py-1">Vehicle</th>
                <th className="border px-2 py-1">Driver</th>
                <th className="border px-2 py-1">Trip Rent</th>
                <th className="border px-2 py-1">Advance</th>
                <th className="border px-2 py-1">Due</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((item, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{item.date}</td>
                  <td className="border px-2 py-1">{item.customer}</td>
                  <td className="border px-2 py-1">{item.load_point}</td>
                  <td className="border px-2 py-1">{item.unload_point}</td>
                  <td className="border px-2 py-1">{item.vehicle_no}</td>
                  <td className="border px-2 py-1">{item.driver_name}</td>
                  <td className="border px-2 py-1">{item.trip_rent}</td>
                  <td className="border px-2 py-1">{item.advance}</td>
                  <td className="border px-2 py-1">{item.due_amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold bg-gray-100">
                <td colSpan={6} className="border px-2 py-1 text-right">
                  Total:
                </td>
                <td className="border px-2 py-1">{totals.rent}</td>
                <td className="border px-2 py-1">{totals.advance}</td>
                <td className="border px-2 py-1">{totals.due}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorLedger;
