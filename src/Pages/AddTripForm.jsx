import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiCalendar } from "react-icons/fi";
import Select from "react-select";
import BtnSubmit from "../components/Button/BtnSubmit";
const AddTripForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const tripDateRef = useRef(null);
  const commision = parseFloat(watch("driver_percentage") || 0);
  const fuel = parseFloat(watch("fuel_price") || 0);
  const gas = parseFloat(watch("gas_price") || 0);
  const totalDamarage = parseFloat(watch("demarage") || 0);
  const other = parseFloat(watch("other_expenses") || 0);
  const total = commision + fuel + gas + totalDamarage + other;
  console.log("total", total);
  // driver name
  const [drivers, setDrivers] = useState([]);
  // car name / registration number
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    fetch("https://api.dropshep.com/api/vehicle")
      .then((response) => response.json())
      .then((data) => setVehicles(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle.registration_number,
    label: vehicle.registration_number,
  }));
  // driver name
  useEffect(() => {
    fetch("https://api.dropshep.com/api/driver")
      .then((response) => response.json())
      .then((data) => setDrivers(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const driverOptions = drivers.map((driver) => ({
    value: driver.name,
    label: driver.name,
  }));
  // post data on server
  const onSubmit = async (data) => {
    console.log("add car data", data);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        "https://api.dropshep.com/api/trip",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "success") {
        toast.success("Trip saved successfully!", {
          position: "top-right",
        });
        reset();
      } else {
        toast.error("Server issue: " + (resData.message || "Unknown issue"));
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server issue: " + errorMessage);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Trip
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Toaster position="top-center" reverseOrder={false} />
          {/* Trip & Destination Section */}
          <div className="border border-gray-300 p-3 md:p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center md:pb-5">
              <span className="py-2 border-b-2 border-primary">
                Trip and Destination Section
              </span>
            </h5>
            <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
              <div className="w-full">
                <label className="text-primary text-sm font-semibold">
                  Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("trip_date", { required: true })}
                    ref={(e) => {
                      register("trip_date").ref(e);
                      tripDateRef.current = e;
                    }}
                    className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
                  />
                  {errors.trip_date && (
                    <span className="text-red-600 text-sm">Required</span>
                  )}
                  <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                    <FiCalendar
                      className="text-white cursor-pointer"
                      onClick={() => tripDateRef.current?.showPicker?.()}
                    />
                  </span>
                </div>
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Trip Time
                </label>
                <input
                  {...register("trip_time", { required: true })}
                  type="text"
                  placeholder="Enter trip time..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.trip_time && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
            </div>

            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Load Point
                </label>
                <input
                  {...register("load_point", { required: true })}
                  type="text"
                  placeholder="Enter load point..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.load_point && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Unload Point
                </label>
                <input
                  {...register("unload_point", { required: true })}
                  type="text"
                  placeholder="Enter unload point..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.unload_point && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle and Driver Info */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                Vehicle and Driver Information
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Vehicle Number
                </label>
                <Controller
                  name="vehicle_number"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      inputRef={ref}
                      value={
                        vehicleOptions.find((c) => c.value === value) || null
                      }
                      onChange={(val) => onChange(val ? val.value : "")}
                      options={vehicleOptions}
                      placeholder="Select vehicle number..."
                      className="mt-1 text-sm"
                      classNamePrefix="react-select"
                      isClearable
                    />
                  )}
                />
                {errors.vehicle_number && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div className="mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Driver Name
                </label>
                <Controller
                  name="driver_name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      inputRef={ref}
                      value={
                        driverOptions.find((c) => c.value === value) || null
                      }
                      onChange={(val) => onChange(val ? val.value : "")}
                      options={driverOptions}
                      placeholder="Select driver name..."
                      className="mt-1 text-sm"
                      classNamePrefix="react-select"
                      isClearable
                    />
                  )}
                />
                {errors.driver_name && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
            </div>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Driver Mobile
                </label>
                <input
                  {...register("driver_contact", { required: true })}
                  type="number"
                  placeholder="Driver's mobile number..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.driver_contact && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Driver Commission (%)
                </label>
                <input
                  {...register("driver_percentage", { required: true })}
                  type="number"
                  placeholder="Driver commission..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.driver_percentage && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
            </div>
          </div>

          {/* Trip Expenses */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                Trip Expenses
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Fuel Cost
                </label>
                <input
                  {...register("fuel_price")}
                  type="text"
                  placeholder="Fuel cost..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Gas Cost
                </label>
                <input
                  {...register("gas_price")}
                  type="text"
                  placeholder="Gas cost..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Other Expenses
                </label>
                <input
                  {...register("other_expenses")}
                  type="text"
                  placeholder="Other expenses..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Waiting Charge
                </label>
                <input
                  {...register("demarage", { required: true })}
                  type="number"
                  placeholder="Waiting charge..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.demarage && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div className="mt-1 w-full">
                <label className="text-primary text-sm font-semibold">
                  Total Trip Cost
                </label>
                <input
                  readOnly
                  value={total}
                  placeholder="Trip cost..."
                  className="cursor-not-allowed mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-gray-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Customer and Payment Info */}
          <div className="border border-gray-300 p-5 rounded-md">
            <h5 className="text-primary font-semibold text-center pb-5">
              <span className="py-2 border-b-2 border-primary">
                Customer and Payment Info
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Customer Name
                </label>
                <input
                  {...register("customer", { required: true })}
                  type="text"
                  placeholder="Customer name..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.customer && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Trip Fare
                </label>
                <input
                  {...register("trip_price", { required: true })}
                  type="text"
                  placeholder="Trip fare..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.trip_price && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Advance Payment
                </label>
                <input
                  {...register("advance")}
                  type="text"
                  placeholder="Advance payment..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-left">
            <BtnSubmit>Submit</BtnSubmit>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTripForm;
