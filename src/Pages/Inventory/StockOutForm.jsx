import { useEffect, useRef, useState } from "react";
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
  const [lastTotalStock, setLastTotalStock] = useState(null);
  const methods = useForm();
  const { handleSubmit, reset, register, control, watch } = methods;
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
  // get total stock
  useEffect(() => {
    fetch("https://api.tramessy.com/mstrading/api/stockOutProduct/list")
      .then((response) => response.json())
      .then((data) => {
        const stockData = data.data;
        if (stockData.length > 0) {
          const lastStockItem = stockData[stockData.length - 1];
          setLastTotalStock(lastStockItem.total_stock);
        }
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  }, []);
  // console.log("lastTotalStock", lastTotalStock);
  // post on server
  const onSubmit = async (data) => {
    const qty = Number(watch("quantity"));
    try {
      const formData = new FormData();
      if (qty > lastTotalStock) {
        toast.error("Quantity cannot be greater than the available stock.", {
          position: "top-right",
        });
        return;
      }
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("ref_id", generateRefId());
      const response = await axios.post(
        "https://api.tramessy.com/mstrading/api/stockOutProduct/create",
        formData
      );
      const resData = response.data;
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
              <SelectField
                name="product_category"
                label="Product Category"
                required
                options={[{ value: "engine_oil", label: "Engine Oil" }]}
              />
            </div>
            <div className="w-full">
              <InputField name="product_name" label="Product Name" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField
                name="quantity"
                label="Quantity"
                required
                type="number"
              />
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
          </div>
          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default StockOutForm;
