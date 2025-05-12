import React from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "../../components/Form/FormFields";

const AddSupply = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Supply Information Setup
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
              <InputField name="business_name" label="Business Name" required />
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
            <div className="w-full">
              <InputField name="due_balance" label="Due Balance" required />
            </div>
            <div className="w-full">
              <InputField
                name="contact_person"
                label="Contact Person"
                required
              />
            </div>
            <div className="relative w-full">
              <SelectField
                name="status"
                label="Status"
                required
                options={[
                  { value: "", label: "Select Status..." },
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </div>
          </div>

          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddSupply;
