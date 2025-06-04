import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaFilter } from "react-icons/fa6";
import { HiCurrencyBangladeshi } from "react-icons/hi2";
import { toWords } from "number-to-words";

const Suzuki = () => {
  const [suzuki, setSuzuki] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch trips data
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/mstrading/api/trip/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setSuzuki(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  // find Suzuki
  const suzukiTrip = suzuki?.filter((dt) => dt.customer === "Suzuki");

  const handleCheckBox = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  // Filter start
  // Get selected data based on selectedRows
  const selectedTrips = suzukiTrip.filter((_, idx) => selectedRows[idx]);
  // Fallback: show all if none selected
  const tripsToCalculate =
    selectedTrips.length > 0 ? selectedTrips : suzukiTrip;
  const filteredTrips = suzukiTrip.filter((trip) => {
    const tripDate = new Date(trip.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (!start || tripDate >= start) && (!end || tripDate <= end);
  });
  // Filter end
  // Bike quantity
  const totalQuantity = tripsToCalculate.reduce(
    (sum, dt) => sum + (parseFloat(dt.quantity) || 0),
    0
  );
  // Total masking
  const totalMasking = tripsToCalculate.reduce(
    (sum, dt) => sum + (parseFloat(dt.masking) || 0),
    0
  );
  // Total extra fare
  const totalExtraFare = tripsToCalculate.reduce(
    (sum, dt) => sum + (parseFloat(dt.extra_fare) || 0),
    0
  );
  // Unload charge
  const totalUnload = tripsToCalculate.reduce(
    (sum, dt) => sum + (parseFloat(dt.unload_charge) || 0),
    0
  );
  // Total vehicle rent with VAT
  const totalVehicleRentWithVAT = tripsToCalculate.reduce((sum, dt) => {
    const rent = parseFloat(dt?.total_rent) || 0;
    const vatAmount = (rent * 15) / 100;
    return sum + rent + vatAmount;
  }, 0);

  // Grand Total (masking + unload + extra + vehicle rent + vat)
  const grandTotal = tripsToCalculate.reduce((sum, dt) => {
    const rent = parseFloat(dt?.total_rent) || 0;
    const vatAmount = (rent * 15) / 100;
    const totalCost = rent + vatAmount;
    return (
      sum +
      (parseFloat(dt.masking) || 0) +
      (parseFloat(dt.unload_charge) || 0) +
      (parseFloat(dt.extra_fare) || 0) +
      totalCost
    );
  }, 0);
  // number to word footer bottom
  const numberToWords = (num) => {
    if (!num || isNaN(num)) return "Zero";
    return toWords(num).replace(/^\w/, (c) => c.toUpperCase()) + " Taka only.";
  };
  const handleSubmit = async () => {
    const selectedData = suzukiTrip.filter((_, i) => selectedRows[i]);
    if (!selectedData.length) {
      return toast.error("Please select at least one row.", {
        position: "top-right",
      });
    }
    try {
      const loadingToast = toast.loading("Submitting selected rows...");
      for (const dt of selectedData) {
        const fd = new FormData();
        fd.append("bill_date", new Date().toISOString().split("T")[0]);
        fd.append("vehicle_no", dt.vehicle_no);
        fd.append("customer_name", dt.customer);
        fd.append("delar_name", dt.dealer_name);
        fd.append("do", dt.do_si);
        fd.append("co", dt.co_u);
        fd.append("unload_point", dt.unload_point);
        fd.append("qty", dt.quantity);
        fd.append("masking", dt.masking);
        fd.append("unload_charge", dt.unload_charge);
        fd.append("extra_fare", dt.extra_fare);
        fd.append("load_point", dt.load_point);
        fd.append("total_amount", dt.total_rent);
        // Step 1: Create ledger entry
        await axios.post(
          "https://api.dropshep.com/mstrading/api/customerLedger/create",
          fd
        );
        // Step 2: Update trip status to Approved
        await axios.post(
          `https://api.dropshep.com/mstrading/api/trip/update/${dt.id}`,
          { status: "Approved" }
        );
      }
      toast.success("Successfully submitted!", {
        id: loadingToast,
        position: "top-right",
      });
      setSelectedRows({});

      // Optional: refetch trips to refresh data
      const refreshed = await axios.get(
        "https://api.dropshep.com/mstrading/api/trip/list"
      );
      if (refreshed.data.status === "Success") {
        setSuzuki(refreshed.data.data);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed. Check console for details.", {
        position: "top-right",
      });
    }
  };

  if (loading) return <p className="text-center mt-16">Loading Suzuki...</p>;

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <HiCurrencyBangladeshi className="text-[#11375B] text-2xl" />
            Billing Suzuki
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
        {/* Conditional Filter Section */}
        {showFilter && (
          <div className="md:flex gap-6 justify-between border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-full">
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                placeholder="Start date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="relative w-full">
              <input
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                placeholder="End date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
        )}
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="capitalize text-sm">
              <tr>
                <th className="border border-gray-700 p-1">SL.</th>
                <th className="border border-gray-700 p-1">Date</th>
                <th className="border border-gray-700 p-1">VehicleNo.</th>
                <th className="border border-gray-700 p-1">DealerName</th>
                <th className="border border-gray-700 p-1">Do(Si)</th>
                <th className="border border-gray-700 p-1">Co(U)</th>
                <th className="border border-gray-700 p-1">Destination</th>
                <th className="border border-gray-700 p-1">
                  Bike
                  <br />
                  Qty
                </th>
                <th className="border border-gray-700 p-1">Masking</th>
                <th className="border border-gray-700 p-1">
                  Unload
                  <br />
                  Charge
                </th>
                <th className="border border-gray-700 p-1">
                  Extra
                  <br />
                  Fare
                </th>
                <th className="border border-gray-700 p-1">
                  VehicleRent
                  <br />
                  WithVatTax
                </th>
                <th className="border border-gray-700 p-1">
                  Total
                  <br />
                  Amount
                </th>
                <th className="border border-gray-700 px-2 py-1">BillStatus</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {filteredTrips?.map((dt, index) => {
                const rent = parseFloat(dt?.total_rent) || 0;
                const vatAmount = (rent * 15) / 100;
                const totalCost = rent + vatAmount;
                // total amount with masking + unload charge + extra fare + VehicleRent WithVatTax
                const totalAmount =
                  (parseFloat(dt.marking) || 0) +
                  (parseFloat(dt.unload_charge) || 0) +
                  (parseFloat(dt.extra_fare) || 0) +
                  totalCost;

                return (
                  <tr key={index} className="hover:bg-gray-50 transition-all">
                    <td className="border border-gray-700 p-1 font-bold">
                      {index + 1}
                    </td>
                    <td className="border border-gray-700 p-1">{dt.date}</td>
                    <td className="border border-gray-700 p-1">
                      {dt.vehicle_no}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {dt.dealer_name}
                    </td>
                    <td className="border border-gray-700 p-1">{dt.do_si}</td>
                    <td className="border border-gray-700 p-1">{dt.co_u}</td>
                    <td className="border border-gray-700 p-1">
                      {dt.unload_point}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {dt.quantity}
                    </td>
                    <td className="border border-gray-700 p-1">{dt.masking}</td>
                    <td className="border border-gray-700 p-1">
                      {dt.unload_charge}
                    </td>
                    <td className="border border-gray-700 p-1">
                      {dt.extra_fare}
                    </td>
                    <td className="border border-gray-700 p-1">{totalCost}</td>
                    <td className="border border-gray-700 p-1">
                      {totalAmount}
                    </td>
                    <td className="border border-gray-700 p-1 text-center">
                      {dt.status === "Pending" ? (
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={!!selectedRows[index]}
                          onChange={() => handleCheckBox(index)}
                        />
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs text-green-700 rounded">
                          Submited
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td
                  colSpan={7}
                  className="border border-black px-2 py-1 text-right"
                >
                  Total
                </td>
                <td className="border border-black px-2 py-1">
                  {totalQuantity}
                </td>
                <td className="border border-black px-2 py-1">
                  {totalMasking}
                </td>
                <td className="border border-black px-2 py-1">{totalUnload}</td>
                <td className="border border-black px-2 py-1">
                  {totalExtraFare}
                </td>
                <td className="border border-black px-2 py-1">
                  {totalVehicleRentWithVAT}
                </td>
                <td className="border border-black px-2 py-1">{grandTotal}</td>
                <td className="border border-black px-2 py-1"></td>
              </tr>

              <tr className="font-bold">
                <td colSpan={7} className="border border-black px-2 py-1">
                  In Words:{" "}
                  <span className="font-medium">
                    {numberToWords(grandTotal)}
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="flex justify-end mt-5">
            <button
              className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300  cursor-pointer"
              onClick={handleSubmit}
            >
              Save Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suzuki;
