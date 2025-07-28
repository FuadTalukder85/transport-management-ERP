import { FormProvider, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import BtnSubmit from "../components/Button/BtnSubmit";
import { InputField, SelectField } from "../components/Form/FormFields";

const AddHelper = () => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      }
      const response = await axios.post(
        "https://api.tramessy.com/mstrading/api/helper/create",
        formData
      );
      const resData = response.data;
      console.log("resData", resData);
      if (resData.status === "Success") {
        toast.success("Helper saved successfully", {
          position: "top-right",
        });
        reset();
      } else {
        toast.error("Server issue: " + (resData.message || "Unknown issue"));
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || error.message || "Unknown error";
      toast.error("Server issue: " + errorMessage);
    }
  };

  return (
    <div className="mt-10">
      <Toaster />
      <h3 className="px-6 py-2 bg-primary text-white font-semibold rounded-t-md">
        Create Helper
      </h3>
      <div className="mx-auto p-6 bg-gray-100 rounded-md shadow">
        <FormProvider {...methods} className="">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* Name & Contact */}
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="helper_name" label="Helper Name" required />
              </div>
              <div className="mt-2 md:mt-0 w-full">
                <InputField name="phone" label="Helper Mobile" required />
              </div>
            </div>

            {/* NID & Emergency Contact */}
            <div className="md:flex justify-between gap-3">
              <div className="w-full">
                <InputField name="address" label="Address" required />
              </div>
              <div className="mt-2 md:mt-0 w-full">
                <InputField name="salary" label="Salary" />
              </div>
            </div>

            {/* Address & Note */}
            <div className="md:flex justify-between gap-3">
              {/* <div className="w-full">
                <InputField name="nid" label="NID Number" required />
              </div>
              <div className="mt-2 md:mt-0 w-full relative">
                <InputField name="note" label="Note" />
              </div> */}
              <div className="w-full relative">
                <SelectField
                  name="status"
                  label="Status"
                  required
                  options={[
                    { value: "Active", label: "Active" },
                    { value: "Inactive", label: "Inactive" },
                  ]}
                />
              </div>
            </div>

            <div className="mt-6 text-left">
              <BtnSubmit>Submit</BtnSubmit>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AddHelper;
