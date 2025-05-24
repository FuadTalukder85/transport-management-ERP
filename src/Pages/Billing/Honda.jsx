import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { HiCurrencyBangladeshi } from "react-icons/hi2";

const Honda = () => {
  const [honda, setHonda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  // Fetch trips data
  useEffect(() => {
    axios
      .get("https://api.dropshep.com/mstrading/api/trip/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setHonda(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching driver data:", error);
        setLoading(false);
      });
  }, []);
  // find honda
  const hondaTrip = honda?.filter((dt) => dt.customer === "Honda");

  if (loading) return <p className="text-center mt-16">Loading Honda...</p>;

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <HiCurrencyBangladeshi className="text-[#11375B] text-2xl" />
            Billing Honda
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
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-2 py-3">SL.</th>
                <th className="px-2 py-3">Date</th>
                <th className="px-2 py-3">Do(Si)</th>
                <th className="px-2 py-3">DealerName</th>
                <th className="px-2 py-3">Address</th>
                <th className="px-2 py-3">NoOfTrip</th>
                <th className="px-2 py-3">NoOfUnit</th>
                <th className="px-2 py-3">VehicleMode</th>
                <th className="px-2 py-3">PerTruckRent</th>
                <th className="px-2 py-3">TotalRent</th>
                <th className="px-2 py-3">Vat</th>
                <th className="px-2 py-3">TotalCost</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {hondaTrip?.map((dt, index) => {
                const rent = parseFloat(dt?.total_rent_cost) || 0;
                const vatAmount = (rent * 15) / 100;
                const totalCost = rent + vatAmount;

                return (
                  <tr key={index} className="hover:bg-gray-50 transition-all">
                    <td className="px-2 py-4 font-bold">{index + 1}</td>
                    <td className="px-2 py-4">{dt.date}</td>
                    <td className="px-2 py-4">{dt.do_si}</td>
                    <td className="px-2 py-4">{dt.dealer_name}</td>
                    <td className="px-2 py-4">{dt.unload_point}</td>
                    <td className="px-2 py-4">{dt.no_of_trip}</td>
                    <td className="px-2 py-4">{dt.quantity}</td>
                    <td className="px-2 py-4">{dt.vehicle_mode}</td>
                    <td className="px-2 py-4">{dt.per_truck_rent}</td>
                    <td className="px-2 py-4">{dt.total_rent}</td>
                    <td className="px-2 py-4">{vatAmount}</td>
                    <td className="px-2 py-4">{totalCost}</td>
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

export default Honda;
