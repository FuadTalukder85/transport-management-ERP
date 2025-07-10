import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const OverViewCard = () => {
  const [expiringDocs, setExpiringDocs] = useState([]);
  const [todayExpenses, setTodayExpenses] = useState([]);
  const [totalTodayExpense, setTotalTodayExpense] = useState(0);

  // remainder papers
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

  // today expense
  useEffect(() => {
    const fetchTodayExpenses = async () => {
      try {
        const today = dayjs().format("YYYY-MM-DD");

        // Fetch purchase
        const purchaseRes = await axios.get(
          "https://api.tramessy.com/mstrading/api/purchase/list"
        );
        const purchases = purchaseRes.data?.data || [];
        const todayPurchases = purchases.filter((item) => item.date === today);

        // Group purchase by category
        const purchaseTotals = {};
        todayPurchases.forEach((item) => {
          const category = item.category || "Others";
          const cost = parseFloat(item.quantity) * parseFloat(item.unit_price);
          if (!purchaseTotals[category]) purchaseTotals[category] = 0;
          purchaseTotals[category] += cost;
        });

        // Fetch trips
        const tripRes = await axios.get(
          "https://api.tramessy.com/mstrading/api/trip/list"
        );
        const trips = tripRes.data?.data || [];
        const todayTrips = trips.filter((item) => item.date === today);

        const tripTotals = {};
        const costFields = [
          "fuel_cost",
          "driver_commission",
          "road_cost",
          "food_cost",
          "body_fare",
          "toll_cost",
          "feri_cost",
          "police_cost",
          "driver_adv",
          "chada",
          "labor",
          "parking_cost",
          "night_guard",
          "unload_charge",
          "extra_fare",
          "vehicle_rent",
        ];

        todayTrips.forEach((trip) => {
          costFields.forEach((field) => {
            const value = parseFloat(trip[field]);
            if (!isNaN(value)) {
              if (!tripTotals[field]) tripTotals[field] = 0;
              tripTotals[field] += value;
            }
          });
        });

        // Merge all
        const combined = { ...purchaseTotals, ...tripTotals };
        const totalExpense = Object.values(combined).reduce((a, b) => a + b, 0);

        setTodayExpenses(combined);
        setTotalTodayExpense(totalExpense);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      }
    };

    fetchTodayExpenses();
  }, []);

  const formatTitle = (str) => {
    return str
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="md:p-5">
      <ul className="md:flex gap-3">
        <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">Today Sales</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>Total Profit</span> - <span>1595</span>
              </p>
            </div>
          </div>
        </li>
        {/* Today expense */}
        <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">Today Expense</h3>
          </div>
          <div className="p-3 text-primary font-semibold text-sm space-y-2">
            {Object.entries(todayExpenses).length > 0 ? (
              Object.entries(todayExpenses).map(([title, amount], i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-primary w-[6px] h-[6px] rounded-full" />
                  <p className="flex justify-between w-full">
                    <span>{formatTitle(title)}</span> -{" "}
                    <span>{amount.toFixed(2)} TK</span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No expenses today.</p>
            )}
            <div className="flex items-center gap-3">
              <p className="flex justify-between w-full border-t mt-3 pt-3">
                <span>Total Expense</span> -{" "}
                <span>{totalTodayExpense.toFixed(2)} TK</span>
              </p>
            </div>
          </div>
        </li>

        {/* Remainder card */}
        <li className="bg-white rounded-md p-3 w-full md:w-full mb-3">
          <div className="text-primary border-b pb-3 border-gray-300">
            <h3 className="font-semibold">Remainder</h3>
          </div>
          <div className="py-3 text-primary font-semibold text-sm space-y-2">
            {expiringDocs.length > 0 ? (
              expiringDocs.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-full">
                    <p>Vehicle No: {item.vehicle}</p>
                    <p>Document's Name: {item.document}</p>
                    <p>Expired Date: {item.expireDate}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No expiration date.</p>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default OverViewCard;
