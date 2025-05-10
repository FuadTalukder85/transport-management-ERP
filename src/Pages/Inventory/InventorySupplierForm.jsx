import React from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/Form/FormFields";

const InventorySupplierForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Inventory Supplier Information
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
              <InputField name="name" label="Name" required />
            </div>
            <div className="w-full">
              <InputField name="phone" label="Phone" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="address" label="Address" required />
            </div>
            <div className="relative w-full">
              <label className="text-primary text-sm font-semibold">
                Status
              </label>
              <select className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
          </div>
          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default InventorySupplierForm;
