import React from "react";

import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/Form/FormFields";
import BtnSubmit from "../../components/Button/BtnSubmit";

const PaymentReceiveForm = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Payment Form
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
                <InputField name="date" label="Date" required />
              </div>
              <div className="w-full">
                <InputField name="customer" label="Customer Name" required />
              </div>
              <div className="w-full">
                <InputField name="bank_name" label="Branch Name" required />
              </div>
            </div>
            <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="bill_ref" label="Bill Ref" required />
              </div>
              <div className="w-full">
                <InputField name="amount" label="Amount" required />
              </div>
            </div>
            <div className="mt-5 md:mt-1 md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="created_by" label="Created By" required />
              </div>
              <div className="w-full">
                <InputField name="status" label="Status" required />
              </div>
            </div>
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

export default PaymentReceiveForm;
