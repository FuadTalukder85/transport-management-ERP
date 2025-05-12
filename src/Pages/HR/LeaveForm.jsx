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
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto p-6 bg-gray-100 rounded-md shadow space-y-4"
        >
          {/* Row 1: Full Name, Apply Date */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="name" label="Full Name" required />
            </div>
            <div className="w-full">
              <InputField name="apply_date" label="Apply Date" required />
            </div>
          </div>

          {/* Row 2: Leave Type, Leave From */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="leave_type" label="Leave Type" required />
            </div>
            <div className="w-full">
              <InputField name="leave_from" label="Leave From" required />
            </div>
          </div>

          {/* Row 3: Leave To, Remark */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <InputField name="leave_to" label="Leave To" required />
            </div>
            <div className="w-full">
              <InputField name="remark" label="Remark" required />
            </div>
          </div>

          {/* Row 4: Status */}
          <div className="md:flex justify-between gap-3">
            <div className="w-full">
              <label className="text-primary text-sm font-semibold">
                Status
              </label>
              <select className="mt-1 w-full text-gray-500 text-sm border border-gray-300 bg-white p-2 rounded appearance-none outline-none">
                <option value="">Select Status...</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LeaveForm;
