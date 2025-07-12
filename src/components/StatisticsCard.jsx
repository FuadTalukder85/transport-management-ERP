import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const StatisticsCard = () => {
  const [expiringDocs, setExpiringDocs] = useState([]);
  // document expiring
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          "https://api.tramessy.com/mstrading/api/vehicle/list"
        );
        const vehicles = response.data?.data || [];
        const todayDate = dayjs();
        const expiring = [];
        vehicles.forEach((vehicle) => {
          ["fitness_date", "road_permit_date", "registration_date"].forEach(
            (type) => {
              const date = dayjs(vehicle[type]);
              if (
                date.isValid() &&
                date.diff(todayDate, "day") <= 7 &&
                date.diff(todayDate, "day") >= 0
              ) {
                expiring.push({
                  vehicle: vehicle.registration_number,
                  document: type.replace(/_/g, " ").toUpperCase(),
                  expireDate: date.format("DD-MM-YYYY"),
                });
              }
            }
          );
        });
        setExpiringDocs(expiring);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div className="md:px-5">
      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 cursor-pointer">
        <h3 className="text-lg font-bold text-primary border-b pb-2 mb-4">
          Document Remainder
        </h3>
        <div className="space-y-3 text-sm text-gray-700 max-h-48 overflow-y-auto pr-2">
          {expiringDocs.length > 0 ? (
            expiringDocs.map((item, i) => (
              <div
                key={i}
                className="bg-yellow-100 p-3 rounded-md border-l-4 border-yellow-500"
              >
                <p className="font-semibold">Vehicle: {item.vehicle}</p>
                <p>{item.document}</p>
                <p>Expires: {item.expireDate}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No documents expiring soon.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;
