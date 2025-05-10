import React from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/Form/FormFields";

const AddStock = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Stock Product Information
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
              <InputField name="category" label="Category" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="product_name" label="Product Name" required />
            </div>
            <div className="w-full">
              <InputField name="quantity" label="Quantity" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="vendor_name" label="Vendor Name" required />
            </div>
            <div className="w-full">
              <InputField name="before_stock" label="Before Stock" required />
            </div>
            <div className="w-full">
              <InputField name="after_stock" label="After Stock" required />
            </div>
          </div>
          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddStock;
