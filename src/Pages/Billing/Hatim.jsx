import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFilter } from "react-icons/fa6";
import { HiCurrencyBangladeshi } from "react-icons/hi2";

const Hatim = () => {
  const [hatim, setHatim] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  // Fetch trips data
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/mstrading/api/trip/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setHatim(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  // find hatim
  const hatimTrip = hatim?.filter((dt) => dt.customer === "Hatim");

  const handleCheckBox = (index) => {
    setSelectedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = async () => {
    const selectedData = hatimTrip.filter((_, i) => selectedRows[i]);
    if (!selectedData.length) {
      return toast.error("Please select at least one row.", {
        position: "top-right",
      });
    }

    try {
      const loadingToast = toast.loading("Submitting selected rows...");

      for (const dt of selectedData) {
        const fd = new FormData();
        fd.append("bill_date", dt.date);
        fd.append("customer_name", dt.customer);
        fd.append("chalan", dt.challan);
        fd.append("load_point", dt.load_point);
        fd.append("unload_point", dt.unload_point);
        fd.append("qty", dt.quantity);
        fd.append("body_cost", dt.body_fare);
        fd.append("fuel_cost", dt.fuel_cost);

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

      toast.success(
        "Successfully submitted!",
        {
          id: loadingToast,
        },
        { position: "top-right" }
      );
      setSelectedRows({});

      // Optional: refetch trips to refresh data
      const refreshed = await axios.get(
        "https://api.dropshep.com/mstrading/api/trip/list"
      );
      if (refreshed.data.status === "Success") {
        setHatim(refreshed.data.data);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed. Check console for details.", {
        position: "top-right",
      });
    }
  };

  if (loading) return <p className="text-center mt-16">Loading Hatim...</p>;
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <HiCurrencyBangladeshi className="text-[#11375B] text-2xl" />
            Billing Hatim
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
          <div className="md:flex gap-5 border border-gray-300 rounded-md p-5 my-5 transition-all duration-300 pb-5">
            <div className="relative w-64">
              <input
                type="date"
                placeholder="Start date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="relative w-64">
              <input
                type="date"
                placeholder="End date"
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>

            <div className="mt-3 md:mt-0 flex gap-2">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaFilter /> Filter
              </button>
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
                <th className="border border-gray-700 p-1">Goods</th>
                <th className="border border-gray-700 p-1">DistributorName</th>
                <th className="border border-gray-700 p-1">Destination</th>
                <th className="border border-gray-700 p-1">Amount</th>
                <th className="border border-gray-700 px-2 py-1">BillStatus</th>
              </tr>
            </thead>
            <tbody className="font-semibold">
              {hatimTrip?.map((dt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="border border-gray-700 p-1 font-bold">
                    {index + 1}
                  </td>
                  <td className="border border-gray-700 p-1">{dt.date}</td>
                  <td className="border border-gray-700 p-1">
                    {dt.vehicle_no}
                  </td>
                  <td className="border border-gray-700 p-1">{dt.goods}</td>
                  <td className="border border-gray-700 p-1 whitespace-pre-line">
                    {dt.distribution_name
                      ?.split(",")
                      .map((point) => point.trim())
                      .join("\n")}
                  </td>
                  <td className="border border-gray-700 p-1 whitespace-pre-line">
                    {dt.unload_point
                      ?.split(",")
                      .map((point) => point.trim())
                      .join("\n")}
                  </td>
                  <td className="border border-gray-700 p-1">
                    {dt.total_rent}
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
              ))}
            </tbody>
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

export default Hatim;
