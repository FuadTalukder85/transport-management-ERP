import { InputField, SelectField } from "../components/Form/FormFields";
import BtnSubmit from "../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { FiCalendar } from "react-icons/fi";
import useRefId from "../hooks/useRef";

const AddTripForm = () => {
  const dateRef = useRef(null);
  const methods = useForm();
  const { watch, handleSubmit, reset, register, setValue, control } = methods;
  const selectedCustomer = watch("customer");
  const selectedTransport = watch("transport_type");

  // select customer from api
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch("https://api.dropshep.com/mstrading/api/customer/list")
      .then((response) => response.json())
      .then((data) => setCustomers(data.data))
      .catch((error) => console.error("Error fetching customer data:", error));
  }, []);

  const customerOptions = customers.map((customer) => ({
    value: customer.customer_name,
    label: customer.customer_name,
  }));
  // select Vehicle No. from api
  const [vehicle, setVehicle] = useState([]);
  useEffect(() => {
    fetch("https://api.dropshep.com/mstrading/api/vehicle/list")
      .then((response) => response.json())
      .then((data) => setVehicle(data.data))
      .catch((error) => console.error("Error fetching vehicle data:", error));
  }, []);

  const vehicleOptions = vehicle.map((dt) => ({
    value: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
    label: `${dt.registration_zone} ${dt.registration_serial} ${dt.registration_number} `,
  }));
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
    contact: driver.driver_mobile,
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
  // const foodCost = parseFloat(watch("food_cost") || 0);
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
    // foodCost +
    fuelCost +
    bodyFare;
  console.log("totalExpense", totalExpense);

  useEffect(() => {
    const total =
      driverCommision +
      roadCost +
      labourCost +
      parkingCost +
      guardCost +
      tollCost +
      feriCost +
      policeCost +
      chadaCost +
      // foodCost +
      fuelCost +
      bodyFare;
    setValue("total_expense", total);
  }, [
    driverCommision,
    roadCost,
    labourCost,
    parkingCost,
    guardCost,
    tollCost,
    feriCost,
    policeCost,
    chadaCost,
    // foodCost,
    fuelCost,
    bodyFare,
    setValue,
  ]);
  // calculate Total Expense of honda

  const noOfTrip = watch("no_of_trip") || 0;
  const perTruckRent = watch("per_truck_rent") || 0;
  const totalRentHonda = Number(noOfTrip) * Number(perTruckRent);
  useEffect(() => {
    const total = Number(noOfTrip) * Number(perTruckRent);
    setValue("total_rent", total || 0);
  }, [noOfTrip, perTruckRent, setValue]);

  // post data on server
  const generateRefId = useRefId();

  const onSubmit = async (data) => {
    const refId = generateRefId();
    console.log("trid data => ", data);
    try {
      // --- First API: Trip Create ---
      const tripFormData = new FormData();
      for (const key in data) {
        tripFormData.append(key, data[key]);
      }
      tripFormData.append("ref_id", refId);
      tripFormData.append("status", "Pending");
      const tripResponse = await axios.post(
        "https://api.dropshep.com/mstrading/api/trip/create",
        tripFormData
      );
      const tripData = tripResponse.data;
      if (tripData.status === "Success") {
        toast.success("Trip added successfully", {
          position: "top-right",
        });
        // if (selectedTransport !== "vendor_transport") {
        // --- Second API: Branch Create (only specific field) ---
        const branchFormData = new FormData();
        branchFormData.append("trip_expense", data.total_expense);
        branchFormData.append("date", data.date);
        branchFormData.append("destination", data.unload_point);
        branchFormData.append("customer", data.customer);
        // branchFormData.append("remarks", data.remarks);
        // branchFormData.append("due", data.due_amount);
        branchFormData.append("ref_id", refId);
        await axios.post(
          "https://api.dropshep.com/mstrading/api/branch/create",
          branchFormData
        );

        // --- Third API: Driver ledger Create (only specific field) ---
        const driverLedgerFormData = new FormData();
        driverLedgerFormData.append("date", data.date);
        driverLedgerFormData.append("driver_name", data.driver_name);
        driverLedgerFormData.append("load_point", data.load_point);
        driverLedgerFormData.append("unload_point", data.unload_point);
        driverLedgerFormData.append("commission", data.driver_commission);
        driverLedgerFormData.append("trip_rent", data.total_rent);
        driverLedgerFormData.append("advanced", data.driver_adv);
        driverLedgerFormData.append("parking_cost", data.parking_cost);
        driverLedgerFormData.append("night_guard", data.night_guard);
        driverLedgerFormData.append("toll_cost", data.toll_cost);
        driverLedgerFormData.append("feri_cost", data.feri_cost);
        driverLedgerFormData.append("police_cost", data.police_cost);
        driverLedgerFormData.append("chada", data.chada);
        driverLedgerFormData.append("labor", data.labour_cost);
        driverLedgerFormData.append("total_exp", data.toll_cost);
        driverLedgerFormData.append("due_amount", data.due_amount);
        driverLedgerFormData.append("ref_id", refId);
        await axios.post(
          "https://api.dropshep.com/mstrading/api/driverLedger/create",
          driverLedgerFormData
        );
        // }

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
                      label="Customer"
                      required={true}
                      options={customerOptions}
                      control={control}
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
                      <SelectField
                        name="vehicle_no"
                        label="Vehicle No."
                        required={true}
                        options={vehicleOptions}
                        control={control}
                      />
                    </div>
                    <div className="w-full">
                      <SelectField
                        name="driver_name"
                        label="Driver Name"
                        required
                        control={control}
                        options={driverOptions}
                        onSelectChange={(selectedOption) => {
                          setValue(
                            "driver_mobile",
                            selectedOption?.contact || ""
                          );
                        }}
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
                    {/* <div className="w-full">
                      <InputField name="sti" label="STI" required />
                    </div> */}
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

            {/* Conditionally Show Hatim Fields */}
            {(selectedCustomer === "Hatim Pubail" ||
              selectedCustomer === "Hatim Rupgonj") && (
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
                    <SelectField
                      name="vehicle_no"
                      label="Vehicle No."
                      required={true}
                      options={vehicleOptions}
                      control={control}
                    />
                  </div>
                  <div className="w-full">
                    <SelectField
                      name="driver_name"
                      label="Driver Name"
                      required
                      control={control}
                      options={driverOptions}
                      onSelectChange={(selectedOption) => {
                        setValue(
                          "driver_mobile",
                          selectedOption?.contact || ""
                        );
                      }}
                    />
                  </div>
                </div>{" "}
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
                    <InputField name="remarks" label="Remarks" required />
                  </div>
                </div>
              </div>
            )}

            {/* Conditionally Show Suzuki Fields */}
            {selectedCustomer === "Suzuki" && (
              <div className="border border-gray-300 p-5 rounded-md mt-3">
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
                    <SelectField
                      name="vehicle_no"
                      label="Vehicle No."
                      required={true}
                      options={vehicleOptions}
                      control={control}
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
                      name="total_rent"
                      label="Total Rent/Bill Amount"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Conditionally Show Honda Fields */}
            {selectedCustomer === "Honda" && (
              <div className="border border-gray-300 p-5 rounded-md mt-3">
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
                      name="dealer_name"
                      label="Dealer Name"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <SelectField
                      name="vehicle_no"
                      label="Vehicle No."
                      required={true}
                      options={vehicleOptions}
                      control={control}
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField name="do_si" label="DO(SI)" required />
                  </div>
                  <div className="w-full">
                    <InputField name="no_of_trip" label="No of Trip" required />
                  </div>
                  <div className="w-full">
                    <InputField name="quantity" label="Quantity" required />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField
                      name="vehicle_mode"
                      label="Vehicle Mode"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="per_truck_rent"
                      label="Per Truck Rent"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="total_rent"
                      label="Total Rent/Bill Amount"
                      required
                      readOnly
                      defaultValue={totalRentHonda}
                      value={totalRentHonda}
                    />
                  </div>
                  <div className="w-full">
                    <InputField name="vat" label="Vat" required />
                  </div>
                </div>
              </div>
            )}
            {/* Conditionally Show Guest Fields */}
            {selectedCustomer === "Guest" && (
              <div className="border border-gray-300 p-5 rounded-md mt-3">
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
                    <SelectField
                      name="vehicle_no"
                      label="Vehicle No."
                      required={true}
                      options={vehicleOptions}
                      control={control}
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
              <div className="border border-gray-300 p-5 rounded-md mt-5">
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
                  <div className="w-full">
                    <InputField
                      name="driver_adv"
                      label="Driver Advance"
                      required
                      type="number"
                    />
                  </div>
                  <div className="w-full">
                    <InputField
                      name="driver_commission"
                      label="Driver Commission"
                      required
                      type="number"
                    />
                  </div>
                  {/* <div className="w-full">
                    <InputField
                      name="road_cost"
                      label="Road Cost"
                      type="number"
                    />
                  </div> */}
                  <div className="w-full">
                    <InputField
                      name="labour_cost"
                      label="Labour Cost"
                      type="number"
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
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
                  <div className="w-full">
                    <InputField
                      name="feri_cost"
                      label="Feri Cost"
                      type="number"
                    />
                  </div>
                </div>
                <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
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
                  {/* <div className="w-full">
                    <InputField
                      name="food_cost"
                      label="Food Cost"
                      type="number"
                    />
                  </div> */}
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
              <div className="border border-gray-300 p-5 rounded-md mt-5 md:mt-3 md:flex justify-between gap-3">
                <div className="w-full">
                  <InputField
                    name="trip_rent"
                    label="Trip Rent"
                    required
                    type="number"
                  />
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
