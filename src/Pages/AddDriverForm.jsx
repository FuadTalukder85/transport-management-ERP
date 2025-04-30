import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiCalendar } from "react-icons/fi";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BtnSubmit from "../components/Button/BtnSubmit";

const AddDriverForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const [previewImage, setPreviewImage] = useState(null);
  const driverDateRef = useRef(null);

  const onSubmit = async (data) => {
    console.log("add car data", data);

    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
      const response = await axios.post(
        "https://api.dropshep.com/api/driver",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "success") {
        toast.success("Driver saved successfully", {
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
      <Toaster />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Create Driver
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name & Contact */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Driver Name *
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Enter driver name..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.name && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-2 md:mt-0 w-full">
              <label className="text-primary text-sm font-semibold">
                Driver Mobile *
              </label>
              <input
                {...register("contact", { required: true })}
                type="number"
                placeholder="Enter mobile number..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.contact && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* NID & Emergency Contact */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                NID Number *
              </label>
              <input
                {...register("nid", { required: true })}
                type="number"
                placeholder="Enter NID number..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.nid && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-2 md:mt-0 w-full">
              <label className="text-primary text-sm font-semibold">
                Emergency Contact
              </label>
              <input
                {...register("emergency_contact")}
                type="number"
                placeholder="Enter emergency contact..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.emergency_contact && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>

          {/* Address & Note */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Address *
              </label>
              <input
                {...register("address", { required: true })}
                type="text"
                placeholder="Enter address..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.address && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-2 md:mt-0 w-full">
              <label className="text-primary text-sm font-semibold">Note</label>
              <input
                {...register("note")}
                type="text"
                placeholder="Enter note..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>

          {/* License & Expiry */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                License No. *
              </label>
              <input
                {...register("license", { required: true })}
                type="text"
                placeholder="Enter license number..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
              {errors.license && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div className="mt-2 md:mt-0 w-full relative">
              <label className="text-primary text-sm font-semibold">
                Expiry Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("expire_date", { required: true })}
                  ref={(e) => {
                    register("expire_date").ref(e);
                    driverDateRef.current = e;
                  }}
                  className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
                />
                {errors.expire_date && (
                  <span className="text-red-600 text-sm">
                    This field is required
                  </span>
                )}
                <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                  <FiCalendar
                    className="text-white cursor-pointer"
                    onClick={() => driverDateRef.current?.showPicker?.()}
                  />
                </span>
              </div>
            </div>
          </div>

          {/* Status & License Image */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full relative">
              <label className="text-primary text-sm font-semibold">
                Status *
              </label>
              <select
                {...register("status", { required: true })}
                className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <span className="text-red-600 text-sm">
                  This field is required
                </span>
              )}
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>

            <div className="mt-3 md:mt-0 w-full">
              <label className="text-primary text-sm font-semibold">
                Upload License Image
              </label>
              <div className="relative mt-1">
                <Controller
                  name="license_image"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({
                    field: { onChange, ref },
                    fieldState: { error },
                  }) => (
                    <div className="relative mt-1">
                      <label
                        htmlFor="license_image"
                        className="border p-2 rounded w-full block bg-white text-gray-500 text-sm cursor-pointer"
                      >
                        {previewImage ? "Image selected" : "Choose image"}
                      </label>
                      <input
                        id="license_image"
                        type="file"
                        accept="image/*"
                        ref={ref}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setPreviewImage(url);
                            onChange(file);
                          } else {
                            setPreviewImage(null);
                            onChange(null);
                          }
                        }}
                      />
                      {error && (
                        <span className="text-red-600 text-sm">
                          {error.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          {previewImage && (
            <div className="mt-3 relative flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  document.getElementById("license_image").value = "";
                }}
                className="absolute top-2 right-2 text-red-600 bg-white shadow rounded-sm hover:text-white hover:bg-secondary transition-all duration-300 cursor-pointer font-bold text-xl p-[2px]"
                title="Remove image"
              >
                <IoMdClose />
              </button>
              <img
                src={previewImage}
                alt="License Preview"
                className="max-w-xs h-auto rounded border border-gray-300"
              />
            </div>
          )}

          <div className="mt-6 text-left">
            <BtnSubmit>Submit</BtnSubmit>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDriverForm;
