import React from "react";
import BtnSubmit from "../../../components/Button/BtnSubmit";

const AttendanceForm = () => {
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Attandance Information
      </h3>
      <form
        action=""
        className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
      >
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Name</label>
            <input
              type="text"
              placeholder="Name..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Date</label>
            <input
              type="text"
              placeholder="Date..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Check in
            </label>
            <input
              type="text"
              placeholder="Check in..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>

        <BtnSubmit>Submit</BtnSubmit>
      </form>
    </div>
  );
};

export default AttendanceForm;
