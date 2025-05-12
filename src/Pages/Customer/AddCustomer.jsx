import BtnSubmit from "../../components/Button/BtnSubmit";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import { FormProvider, useForm } from "react-hook-form";
import { InputField } from "../../components/Form/FormFields";

const AddCustomer = () => {
  const methods = useForm();
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="mt-10">
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Add Customer information
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <FormProvider {...methods} className="">
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="md:flex justify-between gap-3">
              <div className="w-full relative">
                <InputField name="vendor_name" label="Customer Name" required />
              </div>
            </div>
            {/*  */}
            <div className="mt-1 md:flex justify-between gap-3">
              <div className="mt-3 md:mt-0 w-full relative">
                <InputField name="mobile" label="Mobile" required />
              </div>
              <div className="mt-3 md:mt-0 w-full relative">
                <InputField name="mobile" label="Email" required />
              </div>
            </div>
            {/*  */}
            <div className="mt-1 md:flex justify-between gap-3">
              <div className="mt-3 md:mt-0 w-full relative">
                <label className="text-primary text-sm font-semibold">
                  Rent Category
                </label>
                <select className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
                  <option value="">Select Transport Rent</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Gas">Covered Van</option>
                </select>
                <MdOutlineArrowDropDown className="absolute top-[35px] right-2 pointer-events-none text-xl text-gray-500" />
              </div>
              <div className="w-full relative">
                <InputField name="work_area" label="Work Area" required />
              </div>
            </div>
            {/*  */}
            <div className="mt-1 md:flex justify-between gap-3">
              <div className="w-full">
                <label className="text-primary text-sm font-semibold">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="remove-date-icon mt-1 w-full text-sm border border-gray-300 px-3 py-2 rounded bg-white outline-none pr-10"
                  />
                  <span className="py-[11px] absolute right-0 px-3 top-[22px] transform -translate-y-1/2 bg-primary rounded-r">
                    <FiCalendar className="text-white cursor-pointer" />
                  </span>
                </div>
              </div>

              <div className="w-full">
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
            {/* Submit Button */}
            <div className="text-left">
              <BtnSubmit>Submit</BtnSubmit>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddCustomer;
