import React, { useEffect, useRef, useState } from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "../../components/Form/FormFields";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import useRefId from "../../hooks/useRef";
import { FiCalendar } from "react-icons/fi";

const StockOutForm = () => {
  const [vehicle, setVehicle] = useState([]);
  const [driver, setDriver] = useState([]);
  const methods = useForm();
  const { handleSubmit, reset, register, control } = methods;
  const dateRef = useRef(null);
  const generateRefId = useRefId();
  // select vehicle from api
  useEffect(() => {
    fetch("https://api.tramessy.com/mstrading/api/vehicle/list")
      .then((response) => response.json())
      .then((data) => setVehicle(data.data))
      .catch((error) => console.error("Error fetching vehicle data:", error));
  }, []);
  const vehicleOptions = vehicle.map((dt) => ({
    value: dt.vehicle_name,
    label: dt.vehicle_name,
  }));
  // select driver from api
  useEffect(() => {
    fetch("https://api.tramessy.com/mstrading/api/driver/list")
      .then((response) => response.json())
      .then((data) => setDriver(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);
  const driverOptions = driver.map((dt) => ({
    value: dt.driver_name,
    label: dt.driver_name,
  }));
  // post on server
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("ref_id", generateRefId());
      const response = await axios.post(
        "https://api.tramessy.com/mstrading/api/stockOutProduct/create",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "Success") {
        toast.success("Stock out product saved successfully!", {
          position: "top-right",
        });
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
    <div className="mt-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Stock Out Product Information
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
        >
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField
                name="date"
                label="Date"
                type="date"
                required
                inputRef={(e) => {
                  register("date").ref(e);
                  dateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => dateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>
            <div className="w-full">
              <InputField
                name="product_category"
                label="Product Category"
                required
              />
            </div>
            <div className="w-full">
              <InputField name="product_name" label="Product Name" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="quantity" label="Quantity" required />
            </div>
            <div className="w-full">
              <SelectField
                name="vehicle_name"
                label="Vehicle Name"
                required={true}
                options={vehicleOptions}
                control={control}
              />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <SelectField
                name="driver_name"
                label="Driver Name"
                required={true}
                options={driverOptions}
                control={control}
              />
            </div>
            {/* <div className="w-full">
              <InputField name="current_stock" label="Current Stock" required />
            </div> */}
          </div>
          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default StockOutForm;
