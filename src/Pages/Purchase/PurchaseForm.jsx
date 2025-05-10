import React from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/Form/FormFields";

const PurchaseForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Purchase Information
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
        >
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="supplier_name" label="Supplier Name" required />
            </div>
            <div className="w-full">
              <InputField name="rate" label="Rate" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="category" label="Category" required />
            </div>
            <div className="w-full">
              <InputField name="item_name" label="Item Name" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="quantity" label="Quantity" required />
            </div>
            <div className="w-full">
              <InputField name="unit_price" label="Unit Price" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="total" label="Total" required />
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Bill Image
              </label>
              <input
                type="text"
                placeholder="Address..."
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
