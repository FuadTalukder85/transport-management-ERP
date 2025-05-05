import React from "react";

const LeaveForm = () => {
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Leave Application
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
            <label className="text-primary text-sm font-semibold">
              Apply Date
            </label>
            <input
              type="text"
              placeholder="Apply Date..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Status</label>
            <select className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
              <option value="">Select Status...</option>
              <option value="Male">Active</option>
              <option value="Female">Inactive</option>
            </select>
          </div>
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Leave From
            </label>
            <input
              type="text"
              placeholder="Leave From..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Leave To
            </label>
            <input
              type="text"
              placeholder="Leave To..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">
              Leave Type
            </label>
            <input
              type="text"
              placeholder="Leave Type..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
        {/*  */}
        <div className="md:flex justify-between gap-3">
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Remark</label>
            <input
              type="text"
              placeholder="Remark..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-primary text-sm font-semibold">Action</label>
            <input
              type="text"
              placeholder="Action..."
              className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LeaveForm;
