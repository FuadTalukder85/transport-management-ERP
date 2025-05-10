import React from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/Form/FormFields";

const StockOutForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Stock Out Product Information
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
        >
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="date" label="Date" required />
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
              <InputField name="vehicle_name" label="Vehicle Name" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="driver_name" label="Driver Name" required />
            </div>
            <div className="w-full">
              <InputField name="current_stock" label="Current Stock" required />
            </div>
          </div>
          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default StockOutForm;
