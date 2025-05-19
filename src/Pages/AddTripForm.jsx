import { InputField, SelectField } from "../components/Form/FormFields";
import BtnSubmit from "../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";

const AddTripForm = () => {
  const dateRef = useRef(null);
  const methods = useForm();
  const { watch, handleSubmit, reset, register, setValue, control } = methods;
  const selectedCustomer = watch("customer");
  const selectedTransport = watch("transport_type");
  // select driver from api
  const [drivers, setDrivers] = useState([]);
  useEffect(() => {
    fetch("https://api.dropshep.com/mstrading/api/driver/list")
      .then((response) => response.json())
      .then((data) => setDrivers(data.data))
      .catch((error) => console.error("Error fetching driver data:", error));
  }, []);

  const driverOptions = drivers.map((driver) => ({
    value: driver.driver_name,
    label: driver.driver_name,
  }));

  // calculate Total Expense
  const driverCommision = parseFloat(watch("driver_commission") || 0);
  const roadCost = parseFloat(watch("road_cost") || 0);
  const labourCost = parseFloat(watch("labour_cost") || 0);
  const parkingCost = parseFloat(watch("parking_cost") || 0);
  const guardCost = parseFloat(watch("night_guard") || 0);
  const tollCost = parseFloat(watch("toll_cost") || 0);
  const feriCost = parseFloat(watch("feri_cost") || 0);
  const policeCost = parseFloat(watch("police_cost") || 0);
  const chadaCost = parseFloat(watch("chada") || 0);
  const foodCost = parseFloat(watch("food_cost") || 0);
  const fuelCost = parseFloat(watch("fuel_cost") || 0);
  const bodyFare = parseFloat(watch("body_fare") || 0);
  const totalExpense =
    driverCommision +
    roadCost +
    labourCost +
    parkingCost +
    guardCost +
    tollCost +
    feriCost +
    policeCost +
    chadaCost +
    foodCost +
    fuelCost +
    bodyFare;
  console.log("totalExpense", totalExpense);

  useEffect(() => {
    const total =
      driverCommision +
      roadCost +
      parkingCost +
      guardCost +
      tollCost +
      feriCost +
      policeCost +
      chadaCost +
      foodCost +
      fuelCost +
      bodyFare;
    setValue("total_expense", total);
  }, [
    driverCommision,
    roadCost,
    parkingCost,
    guardCost,
    tollCost,
    feriCost,
    policeCost,
    chadaCost,
    foodCost,
    fuelCost,
    bodyFare,
    setValue,
  ]);

  // generate ref id
  const generateRefId = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let refId = "";
    for (let i = 0; i < 6; i++) {
      refId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return refId;
  };

  // post data on server
  const onSubmit = async (data) => {
    const refId = generateRefId();
    try {
      // --- First API: Trip Create ---
      const tripFormData = new FormData();
      for (const key in data) {
        tripFormData.append(key, data[key]);
      }
      tripFormData.append("ref_id", refId);
      const tripResponse = await axios.post(
        "https://api.dropshep.com/mstrading/api/trip/create",
        tripFormData
      );

      const tripData = tripResponse.data;

      if (tripData.status === "Success") {
        toast.success("Trip added successfully", {
          position: "top-right",
        });

        // --- Second API: Branch Create (only specific field) ---
        const branchFormData = new FormData();
        branchFormData.append("trip_expense", data.total_expense);
        branchFormData.append("date", data.date);
        branchFormData.append("destination", data.unload_point);
        branchFormData.append("customer", data.customer);
        branchFormData.append("remarks", data.remarks);
        branchFormData.append("due", data.due_amount);
        branchFormData.append("ref_id", refId);

        await axios.post(
          "https://api.dropshep.com/mstrading/api/branch/create",
          branchFormData
        );

        // Reset form if both succeed
        reset();
      } else {
        toast.error(
          "Trip API failed: " + (tripData.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server issue: " + errorMessage);
    }
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Trip
      </h3>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mx-auto bg-gray-100 rounded-md shadow"
        >
          <div className="border border-gray-300 p-3 md:p-5 rounded-b-md">
            <h5 className="text-3xl font-bold text-center text-[#EF9C07]">
              {selectedCustomer}
            </h5>
            {/* Common Input Fields */}
            <div>
              <div className="border border-gray-300 p-5 rounded-md mt-3">
                <h5 className="text-primary font-semibold text-center pb-5">
                  <span className="py-2 border-b-2 border-primary">
                    Customer and Destination
                  </span>
                </h5>
                <div className="mt-5 md:flex justify-between gap-3">
                  {/* Customer Dropdown */}
                  <div className="w-full relative">
                    <SelectField
                      name="customer"
                      label="Select Customer"
                      required
                      options={[
                        { value: "Yamaha", label: "Yamaha" },
                        { value: "Hatim", label: "Hatim" },
                        { value: "Suzuki", label: "Suzuki" },
                        { value: "Sonalika", label: "Sonalika" },
                        { value: "Honda", label: "Honda" },
                        { value: "Guest", label: "Guest" },
                      ]}
                    />
                  </div>
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
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="load_point" label="Load Point" required />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="unload_point"
                      label="Unload Point"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Conditionally Show Yamaha Fields */}
            {selectedCustomer === "Yamaha" && (
              <div className="">
                <div className="border border-gray-300 p-5 rounded-md mt-3">
                  <h5 className="text-primary font-semibold text-center pb-5">
                    <span className="py-2 border-b-2 border-primary">
                      Transport and Driver section
                    </span>
                  </h5>
                  <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                    <div className="w-full relative">
                      <SelectField
                        name="transport_type"
                        label="Transport Type"
                        required
                        options={[
                          { value: "own_transport", label: "Own Transport" },
                          {
                            value: "vendor_transport",
                            label: "Vendor Transport",
                          },
                        ]}
                      />
                    </div>
                    <div className="w-full">
                      <InputField
                        name="vehicle_no"
                        label="Vehicle No."
                        required
                      />
                    </div>
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
                  <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                    <div className="w-full">
                      <InputField
                        name="driver_mobile"
                        label="Driver Mobile"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <InputField name="challan" label="Challan" required />
                    </div>
                    <div className="w-full">
                      <InputField name="sti" label="STI" required />
                    </div>
                  </div>
                </div>
                <div className="border border-gray-300 p-5 rounded-md mt-3">
                  <h5 className="text-primary font-semibold text-center pb-5">
                    <span className="py-2 border-b-2 border-primary">
                      Product and Expense
                    </span>
                  </h5>
                  <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                    <div className="w-full">
                      <InputField name="model_no" label="Model No." required />
                    </div>
                    <div className="w-full">
                      <InputField name="quantity" label="Quantity" required />
                    </div>
                  </div>

                  <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                    <div className="w-full">
                      <InputField
                        name="total_rent"
                        label="Total Rent/Bill Amount"
                        required
                      />
                    </div>
                    <div className="w-full">
                      <InputField name="fuel_cost" label="Fuel Cost" required />
                    </div>
                    <div className="w-full">
                      <InputField name="body_fare" label="Body Fare" required />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Conditionally Show Suzuki Fields */}
            {selectedCustomer === "Suzuki" && (
              <div className="border-t border-gray-300">
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full relative">
                    <SelectField
                      name="transport_type"
                      label="Transport Type"
                      required
                      options={[
                        { value: "", label: "Select Transport Type" },
                        { value: "own_transport", label: "Own Transport" },
                        {
                          value: "vendor_transport",
                          label: "Vendor Transport",
                        },
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="vehicle_no"
                      label="Vehicle No."
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="dealer_name"
                      label="Dealer Name"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="do_si" label="Do(SI)" required />
                  </div>
                  <div className="w-full">
                    <InputField name="co_u" label="CO(U)" required />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField
                      name="quantity"
                      label="Bike/Quantity"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="masking" label="Masking" required />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="unload_charge"
                      label="Unload Charge"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="extra_fare" label="Extra Fare" required />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="vehicle_rent"
                      label="Vehicle Rent"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="total_rent"
                      label="Total Rent/Bill Amount"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Conditionally Show Hatim Fields */}
            {selectedCustomer === "Hatim" && (
              <div className="border-t border-gray-300">
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full relative">
                    <SelectField
                      name="transport_type"
                      label="Transport Type"
                      required
                      options={[
                        { value: "", label: "Select Transport Type" },
                        { value: "own_transport", label: "Own Transport" },
                        {
                          value: "vendor_transport",
                          label: "Vendor Transport",
                        },
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="vehicle_no"
                      label="Vehicle No."
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="goods" label="Goods" required />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField
                      name="distribution_name"
                      label="Distribution Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="total_rent"
                      label="Total Rent/Bill Amount"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="remarks" label="Remarks" />
                  </div>
                </div>
              </div>
            )}

            {/* Conditionally Show Honda Fields */}
            {selectedCustomer === "Honda" && (
              <div className="border-t border-gray-300">
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full relative">
                    <SelectField
                      name="transport_type"
                      label="Transport Type"
                      required
                      options={[
                        { value: "", label: "Select Transport Type" },
                        { value: "own_transport", label: "Own Transport" },
                        {
                          value: "vendor_transport",
                          label: "Vendor Transport",
                        },
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="dealer_name"
                      label="Dealer Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="vehicle_no"
                      label="Vehicle No."
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="do_si" label="DO(SI)" required />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="no_of_trip" label="No of Trip" required />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="vehicle_mode"
                      label="Vehicle Mode"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="quantity" label="Quantity" required />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="per_truck_rent"
                      label="Per Truck Rent"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="vat" label="Vat" required />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="total_rent_cost"
                      label="Total Rent Cost"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            {/* Conditionally Show Guest Fields */}
            {selectedCustomer === "Guest" && (
              <div className="">
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full relative">
                    <SelectField
                      name="transport_type"
                      label="Transport Type"
                      required
                      options={[
                        { value: "", label: "Select Transport Type" },
                        { value: "own_transport", label: "Own Transport" },
                        {
                          value: "vendor_transport",
                          label: "Vendor Transport",
                        },
                      ]}
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="vehicle_no"
                      label="Vehicle No."
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField
                      name="driver_name"
                      label="Driver Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="fuel_cost" label="Fuel Cost" required />
                  </div>
                </div>
              </div>
            )}
            {/* transport type input field */}
            {selectedTransport === "own_transport" && (
              <div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField
                      name="driver_commission"
                      label="Driver Commission"
                      required
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="road_cost"
                      label="Road Cost"
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="labour_cost"
                      label="Labour Cost"
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="parking_cost"
                      label="Parking Cost"
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="night_guard"
                      label="Night Guard Cost"
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="toll_cost"
                      label="Toll Cost"
                      type="number"
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <div className="w-full">
                      <InputField
                        name="feri_cost"
                        label="Feri Cost"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <InputField
                      name="police_cost"
                      label="Police Cost"
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="chada" label="Chada" type="number" />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="food_cost"
                      label="Food Cost"
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="total_expense"
                      label="Total Expense"
                      readOnly
                      defaultValue={totalExpense}
                      value={totalExpense}
                      required
                    />
                  </div>
                </div>
              </div>
            )}
            {selectedTransport === "vendor_transport" && (
              <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                <div className="w-full">
                  <InputField name="trip_rent" label="Trip Rent" required />
                </div>
                <div className="w-full">
                  <InputField name="advance" label="Advance" required />
                </div>
                <div className="w-full">
                  <InputField name="due_amount" label="Due Amount" required />
                </div>
              </div>
            )}
            {/* Submit Button */}
            <div className="text-left p-5">
              <BtnSubmit>Submit</BtnSubmit>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddTripForm;
