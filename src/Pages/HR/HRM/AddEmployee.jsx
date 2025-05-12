import React, { useRef } from "react";
import BtnSubmit from "../../../components/Button/BtnSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { InputField, SelectField } from "../../../components/Form/FormFields";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";

const AddEmployee = () => {
  const methods = useForm();
  const { handleSubmit, register } = methods;
  const dateRef = useRef(null);
  const joinDateRef = useRef(null);

  const onSubmit = async (data) => {
    console.log("add employee data", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Employee Information
      </h3>
      <FormProvider {...methods} className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
        >
          {/* Row 1: Full Name, Email, Mobile */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <SelectField
                name="branch_name"
                label="Branch Name"
                required
                options={[
                  { value: "Abdullahpur", label: "Abdullahpur" },
                  { value: "Comilla", label: "Comilla" },
                ]}
              />
            </div>
            <div className="w-full">
              <InputField name="full_name" label="Full Name" required />
            </div>
            <div className="w-full">
              <InputField name="email" label="Email" required />
            </div>
          </div>

          {/* Row 2: Gender, Birth Date, Join Date */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="mobile" label="Mobile" required />
            </div>
            <div className="w-full relative">
              <SelectField
                name="gender"
                label="Gender"
                required
                options={[
                  { value: "", label: "Gender..." },
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                  { value: "Others", label: "Others" },
                ]}
              />
              <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
            </div>
            <div className="w-full">
              <InputField
                name="birth_date"
                label="Birth Date"
                type="date"
                required
                inputRef={(e) => {
                  register("birth_date").ref(e);
                  dateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => dateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>
          </div>

          {/* Row 3: Designation, Salary, Address */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField
                name="join_date"
                label="Join Date"
                type="date"
                required
                inputRef={(e) => {
                  register("join_date").ref(e);
                  joinDateRef.current = e;
                }}
                icon={
                  <span
                    className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r"
                    onClick={() => joinDateRef.current?.showPicker?.()}
                  >
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                }
              />
            </div>
            <div className="w-full">
              <InputField name="designation" label="Designation" required />
            </div>
            <div className="w-full">
              <InputField name="salary" label="Salary" required />
            </div>
          </div>

          {/* Row 4: Image */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="address" label="Address" required />
            </div>
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Image
              </label>
              <input
                type="text"
                placeholder="Image URL..."
                className="mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none"
              />
            </div>
          </div>

          <BtnSubmit>Submit</BtnSubmit>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEmployee;
