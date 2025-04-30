import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiCalendar } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Select from "react-select";
import BtnSubmit from "../components/Button/BtnSubmit";
const AddCarForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const registrationDateRef = useRef(null);
  const taxDateRef = useRef(null);
  const roadPermitRef = useRef(null);
  const fitnessDateRef = useRef(null);
  // select driver
  const [drivers, setDrivers] = useState([]);
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

  // post vehicle
  const onSubmit = async (data) => {
    console.log("add car data", data);
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        "https://api.dropshep.com/api/vehicle",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "Vehicle saved successfully") {
        toast.success("Vehicle saved successfully!", { position: "top-right" });
        reset();
      } else {
        toast.error("Server error: " + (resData.message || "Unknown issue"));
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server error: " + errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Vehicle Information
      </h3>

      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4">
        {/* Vehicle & Driver Name */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Vehicle Name
            </label>
            <input
              {...register("vehicle_name", { required: true })}
              type="text"
              placeholder="Vehicle name..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
            {errors.vehicle_name && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="relative mt-2 md:mt-0 w-full">
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
                  value={driverOptions.find((c) => c.value === value) || null}
                  onChange={(val) => onChange(val ? val.value : "")}
                  options={driverOptions}
                  placeholder="Select driver..."
                  className="mt-1 text-sm"
                  classNamePrefix="react-select"
                  isClearable
                />
              )}
            />
            {errors.driver_name && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
        </div>

        {/* Category & Size */}
        <div className="md:flex justify-between gap-3">
          <div className="relative w-full">
            <label className="text-primary text-sm font-semibold">
              Vehicle Category
            </label>
            <select
              {...register("category", { required: true })}
              className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
            >
              <option value="">Select vehicle category...</option>
              <option value="Truck">Truck</option>
              <option value="Pickup">Pickup</option>
              <option value="Covered Van">Covered Van</option>
              <option value="Trailer">Trailer</option>
              <option value="Fridge Van">Fridge Van</option>
              <option value="Car">Car</option>
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            {errors.category && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="relative mt-2 md:mt-0 w-full">
            <label className="text-primary text-sm font-semibold">
              Vehicle Size
            </label>
            <select
              {...register("size", { required: true })}
              className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
            >
              <option value="">Select size...</option>
              {[
                "7 Feet",
                "9 Feet",
                "12 Feet",
                "14 Feet",
                "16 Feet",
                "18 Feet",
                "20 Feet",
                "23 Feet",
              ].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            {errors.size && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
        </div>

        {/* Registration Number & Serial */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Registration Number
            </label>
            <input
              {...register("registration_number", { required: true })}
              type="text"
              placeholder="Registration number..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
            {errors.registration_number && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
          <div className="relative mt-2 md:mt-0 w-full">
            <label className="text-primary text-sm font-semibold">
              Registration Serial
            </label>
            <select
              {...register("registration_serial", { required: true })}
              className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
            >
              <option value="">Select serial...</option>
              {["Ta", "Tha", "Da", "Dha", "Na", "M", "Sh"].map((serial) => (
                <option key={serial} value={serial}>
                  {serial}
                </option>
              ))}
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            {errors.registration_serial && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
        </div>

        {/* Registration Zone */}
        <div className="md:flex justify-between gap-3">
          <div className="relative w-full">
            <label className="text-primary text-sm font-semibold">
              Registration Zone
            </label>
            <select
              {...register("registration_zone", { required: true })}
              className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
            >
              <option value="">Select zone...</option>
              {[
                "Dhaka Metro",
                "Chatto Metro",
                "Sylhet Metro",
                "Rajshahi Metro",
                "Khulna Metro",
                "Rangpur Metro",
                "Barisal Metro",
                "Dhaka",
                "Narayanganj",
                "Gazipur",
                "Tangail",
                "Manikgonj",
                "Munshigonj",
                "Faridpur",
                "Rajbari",
                "Narsingdi",
                "Kishorgonj",
                "Shariatpur",
                "Gopalgonj",
                "Madaripur",
                "Chattogram",
                "Cumilla",
                "Feni",
                "Brahmanbaria",
                "Noakhali",
                "Chandpur",
                "Lokkhipur",
                "Bandarban",
                "Rangamati",
                "CoxsBazar",
                "Khagrasori",
                "Barisal",
                "Barguna",
                "Bhola",
                "Patuakhali",
                "Pirojpur",
                "Jhalokati",
                "Khulna",
                "Kustia",
                "Jashore",
                "Chuadanga",
                "Satkhira",
                "Bagerhat",
                "Meherpur",
                "Jhenaidah",
                "Norail",
                "Magura",
                "Rangpur",
                "Ponchogor",
                "Thakurgaon",
                "Kurigram",
                "Dinajpur",
                "Nilfamari",
                "Lalmonirhat",
                "Gaibandha",
                "Rajshahi",
                "Pabna",
                "Bagura",
                "Joypurhat",
                "Nouga",
                "Natore",
                "Sirajgonj",
                "Chapainawabganj",
                "Sylhet",
                "Habiganj",
                "Moulvibazar",
                "Sunamgonj",
                "Mymensingh",
                "Netrokona",
                "Jamalpur",
                "Sherpur",
              ].map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            {errors.registration_zone && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>

          {/* Registration Date */}
          <div className="relative w-full">
            <label className="text-primary text-sm font-semibold">
              Registration Date
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("registration_date", { required: true })}
                ref={(e) => {
                  register("registration_date").ref(e);
                  registrationDateRef.current = e;
                }}
                className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
              />
              {errors.registration_date && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
              <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                <FiCalendar
                  className="text-white cursor-pointer"
                  onClick={() => registrationDateRef.current?.showPicker?.()}
                />
              </span>
            </div>
          </div>

          {/* Tax Expiry Date */}
          <div className="mt-2 md:mt-0 w-full">
            <label className="text-primary text-sm font-semibold">
              Tax Expiry Date
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("text_date", { required: true })}
                ref={(e) => {
                  register("text_date").ref(e);
                  taxDateRef.current = e;
                }}
                className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
              />
              {errors.text_date && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
              <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                <FiCalendar
                  className="text-white cursor-pointer"
                  onClick={() => taxDateRef.current?.showPicker?.()}
                />
              </span>
            </div>
          </div>
        </div>

        {/* Road Permit & Fitness Date & Status */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Road Permit Date
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("road_permit_date", { required: true })}
                ref={(e) => {
                  register("road_permit_date").ref(e);
                  roadPermitRef.current = e;
                }}
                className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
              />
              {errors.road_permit_date && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
              <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                <FiCalendar
                  className="text-white cursor-pointer"
                  onClick={() => roadPermitRef.current?.showPicker?.()}
                />
              </span>
            </div>
          </div>

          <div className="mt-2 md:mt-0 w-full">
            <label className="text-primary text-sm font-semibold">
              Fitness Expiry Date
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("fitness_date", { required: true })}
                ref={(e) => {
                  register("fitness_date").ref(e);
                  fitnessDateRef.current = e;
                }}
                className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
              />
              {errors.fitness_date && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
              <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                <FiCalendar
                  className="text-white cursor-pointer"
                  onClick={() => fitnessDateRef.current?.showPicker?.()}
                />
              </span>
            </div>
          </div>

          <div className="w-full relative">
            <label className="text-primary text-sm font-semibold">Status</label>
            <select
              {...register("status", { required: true })}
              className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            {errors.status && (
              <span className="text-red-600 text-sm">
                This field is required
              </span>
            )}
          </div>
        </div>

        <div className="text-left">
          <BtnSubmit>Submit</BtnSubmit>
        </div>
      </div>
    </form>
  );
};

export default AddCarForm;
