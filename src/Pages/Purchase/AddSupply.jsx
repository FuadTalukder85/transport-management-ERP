import React from "react";
import BtnSubmit from "../../components/Button/BtnSubmit";
import { MdOutlineArrowDropDown } from "react-icons/md";

const AddSupply = () => {
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Supply Information
      </h3>
      <form
        action=""
        className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
      >
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Date</label>
            <input
              type="text"
              placeholder="Date..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Name</label>
            <input
              type="text"
              placeholder="Name..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Phone</label>
            <input
              type="number"
              placeholder="Phone..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Address
            </label>
            <input
              type="text"
              placeholder="Address..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="relative w-full">
            <label className="text-primary text-sm font-semibold">Status</label>
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
    </div>
  );
};

export default AddSupply;
