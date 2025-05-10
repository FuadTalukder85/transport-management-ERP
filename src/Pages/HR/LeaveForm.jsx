import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/Form/FormFields";

const LeaveForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Leave Application
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
        >
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="name" label="Full Name" required />
            </div>
            <div className="w-full">
              <InputField name="apply_date" label="Apply Date" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Status
              </label>
              <select className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
                <option value="">Select Status...</option>
                <option value="Male">Active</option>
                <option value="Female">Inactive</option>
              </select>
            </div>
            <div className="w-full">
              <InputField name="leave_from" label="Leave From" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="leave_to" label="Leave To" required />
            </div>
            <div className="w-full">
              <InputField name="leave_type" label="Leave Type" required />
            </div>
          </div>
          {/*  */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="remark" label="Remark" required />
            </div>
            {/* <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Action
              </label>
              <input
                type="text"
                placeholder="Action..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div> */}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LeaveForm;
