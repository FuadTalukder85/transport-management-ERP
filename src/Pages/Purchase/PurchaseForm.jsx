import React, { useRef } from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "../../components/Form/FormFields";
import { FiCalendar } from "react-icons/fi";

const PurchaseForm = () => {
  const methods = useForm();
  const { handleSubmit, register, watch } = methods;
  const purChaseDateRef = useRef(null);
  const selectedCategory = watch("category");
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  // todo set default status = unpaid, generate auto ref number from backend
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Purchase Information
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
                name="purchase_date"
                label="Purchase Date"
                type="date"
                required
                inputRef={(e) => {
                  register("purchase_date").ref(e);
                  purChaseDateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => purChaseDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>
            <div className="w-full">
              <SelectField
                name="category"
                label="Category"
                required
                options={[
                  { value: "Fuel", label: "Fuel" },
                  { value: "Parts", label: "Parts" },
                  { value: "Stationary", label: "Stationary" },
                  { value: "Snacks", label: "Snacks" },
                  { value: "Electronics", label: "Electronics" },
                  { value: "Furniture", label: "Furniture" },
                ]}
              />
            </div>
            <div className="w-full">
              <InputField name="item_name" label="Item Name" required />
            </div>
          </div>
          {/* fuel category */}
          {selectedCategory === "Fuel" && (
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="driver_name" label="Driver Name" required />
              </div>
              <div className="w-full">
                <InputField name="vehicle_no" label="Vehicle No" required />
              </div>
            </div>
          )}

          {/*  */}
          <div className="md:flex justify-between gap-3">
            {" "}
            <div className="w-full">
              <InputField name="supplier_name" label="Supplier Name" required />
            </div>
            <div className="w-full">
              <InputField name="quantity" label="Quantity" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="unit_price" label="Unit Price" required />
            </div>
            <div className="w-full">
              <InputField name="total" label="Total" required />
            </div>
            <div className="w-full">
              <InputField name="remark" label="Remark" required />
            </div>
          </div>
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="payment" label="Payment" required />
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Bill Image
              </label>
              <input
                type="text"
                placeholder="Bill Image..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>
          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default PurchaseForm;
