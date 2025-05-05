import axios from "axios";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiCalendar } from "react-icons/fi";
import BtnSubmit from "../components/Button/BtnSubmit";
import Select from "react-select";
import { MdOutlineArrowDropDown } from "react-icons/md";

const AddRentVehicleForm = () => {
  //   const fuelDateRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const quantity = parseFloat(watch("quantity") || 0);
  const price = parseFloat(watch("price") || 0);
  const total = quantity * price;

  useEffect(() => {
    fetch("https://api.dropshep.com/api/vehicle")
      .then((response) => response.json())

      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  useEffect(() => {
    fetch("https://api.dropshep.com/api/driver")
      .then((response) => response.json())

      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const onSubmit = async (data) => {
    console.log("add fuel data", data);
    data.total_price = total;
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        "https://api.dropshep.com/api/fuel",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "Success") {
        toast.success("Fuel saved successfully!", {
          position: "top-right",
        });
        reset();
      } else {
        toast.error("Server Error: " + (resData.message || "Unknown issue"));
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server Error: " + errorMessage);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Vehicle Information
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Toaster position="top-center" reverseOrder={false} />
          {/* Trip & Destination Section */}
          <div className="border border-gray-300 p-3 md:p-5 rounded-md">
            <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Vehicle Name/Model
                </label>
                <input
                  {...register("trip_time", { required: true })}
                  type="text"
                  placeholder="Vehicle Name..."
                  className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
                />
                {errors.trip_time && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Vendor Name
                </label>
                <input
                  {...register("trip_time", { required: true })}
                  type="text"
                  placeholder="Vendor Name..."
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
                  Vehicle Category
                </label>
                <Controller
                  name="vehicle_number"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      inputRef={ref}
                      //   value={
                      //     vehicleOptions.find((c) => c.value === value) || null
                      //   }
                      onChange={(val) => onChange(val ? val.value : "")}
                      //   options={vehicleOptions}
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
              <div className="mt-2 md:mt-1 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Vehicle Size/Capacity
                </label>
                <input
                  {...register("unload_point", { required: true })}
                  type="text"
                  placeholder="Vehicle Size/Capacity..."
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
                Transport Registration Number
              </span>
            </h5>
            <div className="md:flex justify-between gap-3">
              <div className="relative w-full">
                <label className="text-primary text-sm font-semibold">
                  Registration Zone
                </label>
                <select
                  {...register("registration_zone", { required: true })}
                  className="mt-2 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
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
              <div className="relative mt-2 md:mt-0 w-full">
                <label className="text-primary text-sm font-semibold">
                  Registration Serial
                </label>
                <select
                  {...register("registration_serial", { required: true })}
                  className="mt-2 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
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
            </div>
          </div>
          <div className="w-full">
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
          {/* Submit Button */}
          <div className="text-left">
            <BtnSubmit>Submit</BtnSubmit>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRentVehicleForm;
