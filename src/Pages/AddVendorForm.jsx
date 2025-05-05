import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiCalendar } from "react-icons/fi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import BtnSubmit from "../components/Button/BtnSubmit";

const AddVendorForm = () => {
  const fuelDateRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
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
        Vendor Form
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Toaster position="top-center" reverseOrder={false} />
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                Vendor Name
              </label>
              <input
                {...register("pump_name_address", { required: true })}
                type="text"
                placeholder="Vendor Name..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.pump_name_address && (
                <span className="text-red-600 text-sm">Required</span>
              )}
              {errors.vehicle_number && (
                <span className="text-red-600 text-sm">Required</span>
              )}
            </div>
          </div>
          {/*  */}
          <div className="mt-1 md:flex justify-between gap-3">
            <div className="mt-3 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                Mobile
              </label>
              <input
                {...register("trip_id_invoice_no")}
                type="text"
                placeholder="Mobile..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.driver_name && (
                <span className="text-red-600 text-sm">Required</span>
              )}
            </div>
            <div className="mt-3 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                Email
              </label>
              <input
                {...register("trip_id_invoice_no")}
                type="text"
                placeholder="Email..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="mt-1 md:flex justify-between gap-3">
            <div className="mt-3 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                Rent Category
              </label>
              <select
                {...register("type", { required: true })}
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">Select Transport Rent</option>
                <option value="Pickup">Pickup</option>
                <option value="Gas">Covered Van</option>
              </select>
              {errors.type && (
                <span className="text-red-600 text-sm">Required</span>
              )}
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                Work Area
              </label>
              <input
                {...register("capacity")}
                type="text"
                placeholder="Work Area..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          {/*  */}
          <div className="mt-1 md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">Date</label>
              <div className="relative">
                <input
                  type="date"
                  {...register("date_time", { required: true })}
                  ref={(e) => {
                    register("date_time").ref(e);
                    fuelDateRef.current = e;
                  }}
                  className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
                />
                {errors.date_time && (
                  <span className="text-red-600 text-sm">Required</span>
                )}
                <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                  <FiCalendar
                    className="text-white cursor-pointer"
                    onClick={() => fuelDateRef.current?.showPicker?.()}
                  />
                </span>
              </div>
            </div>

            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Status
              </label>
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
          {/*  */}

          {/* Submit Button */}
          <div className="text-left">
            <BtnSubmit>Submit</BtnSubmit>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendorForm;
