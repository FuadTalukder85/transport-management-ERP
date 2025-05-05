import React from "react";
import BtnSubmit from "../../../components/Button/BtnSubmit";

const AdvanceSalaryForm = () => {
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Advance Salary Information
      </h3>
      <form
        action=""
        className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
      >
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Amount</label>
            <input
              type="number"
              placeholder="Amount..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Salary Month
            </label>
            <input
              type="text"
              placeholder="Salary Month..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>

        <BtnSubmit>Submit</BtnSubmit>
      </form>
    </div>
  );
};

export default AdvanceSalaryForm;
