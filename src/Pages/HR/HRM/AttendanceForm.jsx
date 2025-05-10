import React from "react";
import BtnSubmit from "../../../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../../components/Form/FormFields";

const AttendanceForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Attendance Form
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-3 mx-auto bg-gray-100 rounded-md shadow"
        >
          {/* Trip & Destination Section */}
          <div className="border border-gray-300 p-3 md:p-5 rounded-b-md">
            <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="name" label="Name" required />
              </div>
              <div className="w-full">
                <InputField name="date" label="Date" required />
              </div>
              <div className="w-full">
                <InputField name="check_in" label="Check In" required />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-left p-5">
            <BtnSubmit>Submit</BtnSubmit>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AttendanceForm;
