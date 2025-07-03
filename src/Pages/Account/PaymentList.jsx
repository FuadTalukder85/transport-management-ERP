import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserSecret } from "react-icons/fa6";
import { InputField } from "../../components/Form/FormFields";
import { FormProvider, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import BtnSubmit from "../../components/Button/BtnSubmit";
import useRefId from "../../hooks/useRef";

const PaymentList = () => {
  const generateRefId = useRefId();
  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/payment/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setPayment(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-16">Loading data...</p>;
  // onsubmit
  const onSubmit = async (data) => {
    const refId = generateRefId();
    if (!data.main_amount || isNaN(data.main_amount)) {
      toast.error("Invalid payment amount");
      return;
    }

    const previousAmount = parseFloat(selectedPayment.main_amount) || 0;
    const newAmount = parseFloat(data.main_amount);
    const updatedAmount = previousAmount + newAmount;

    try {
      const response = await axios.post(
        `https://api.tramessy.com/mstrading/api/payment/update/${selectedPayment.id}`,
        {
          main_amount: updatedAmount,
        }
      );

      if (response.data.status === "Success") {
        // --- Second API: Supplier Ledger Create ---
        const supplierFormData = new FormData();
        supplierFormData.append("data", new Date().toISOString().split("T")[0]);
        supplierFormData.append("supplier_name", selectedPayment.supplier_name);
        supplierFormData.append("remarks", data.note);
        supplierFormData.append("payment_amount", data.main_amount);
        supplierFormData.append("ref_id", refId);
        await axios.post(
          "https://api.tramessy.com/mstrading/api/supplierLedger/create",
          supplierFormData
        );

        // --- Third API: Branch Ledger Create ---
        const branchLedgerFormData = new FormData();
        branchLedgerFormData.append(
          "date",
          new Date().toISOString().split("T")[0]
        );
        branchLedgerFormData.append("branch_name", selectedPayment.branch_name);
        branchLedgerFormData.append("remarks", data.note);
        branchLedgerFormData.append("cash_out", data.main_amount);
        branchLedgerFormData.append("ref_id", refId);
        await axios.post(
          "https://api.tramessy.com/mstrading/api/branch/create",
          branchLedgerFormData
        );

        toast.success("Payment updated successfully!", {
          position: "top-right",
        });

        // UI update
        setPayment((prevList) =>
          prevList.map((item) =>
            item.id === selectedPayment.id
              ? {
                  ...item,
                  main_amount: updatedAmount,
                  status:
                    updatedAmount === 0
                      ? "Unpaid"
                      : updatedAmount < parseFloat(item.total_amount)
                      ? "Partial"
                      : "Paid",
                }
              : item
          )
        );
        setShowModal(false);
      } else {
        toast.error(response.data.message || "Failed to update.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Server error");
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUserSecret className="text-[#11375B] text-2xl" />
            Payment List
          </h1>
        </div>
        <div className="mt-5 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="px-1 py-3">SL.</th>
                <th className="px-1 py-3">Date</th>
                <th className="px-1 py-3">SupplierName</th>
                <th className="px-1 py-3">Category</th>
                <th className="px-1 py-3">ItemName</th>
                <th className="px-1 py-3">Quantity</th>
                <th className="px-1 py-3">UnitPrice</th>
                <th className="px-1 py-3">TotalAmount</th>
                <th className="px-1 py-3">PayAmount</th>
                <th className="px-1 py-3">DueAmount</th>
                <th className="px-1 py-3">Status</th>
                <th className="px-1 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {payment?.map((dt, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-all">
                  <td className="px-1 py-4 font-bold">{index + 1}</td>
                  <td className="px-1 py-4">{dt.date}</td>
                  <td className="px-1 py-4">{dt.supplier_name}</td>
                  <td className="px-1 py-4">{dt.category}</td>
                  <td className="px-1 py-4">{dt.item_name}</td>
                  <td className="px-1 py-4">{dt.quantity}</td>
                  <td className="px-1 py-4">{dt.unit_price}</td>
                  <td className="px-1 py-4">{dt.total_amount}</td>
                  <td className="px-1 py-4">{dt.main_amount}</td>
                  <td className="px-1 py-4">
                    {dt.total_amount - dt.main_amount}
                  </td>
                  <td className="px-1 py-4">
                    {(() => {
                      const total = parseFloat(dt.total_amount) || 0;
                      const paid = parseFloat(dt.main_amount) || 0;
                      const due = total - paid;

                      let status = "Unpaid";
                      if (due === 0) {
                        status = "Paid";
                      } else if (paid > 0 && due > 0) {
                        status = "Partial";
                      }

                      return (
                        <select
                          value={status}
                          disabled
                          className="appearance-none text-xs font-semibold rounded-md px-2 py-1 border border-gray-300 bg-gray-100 text-gray-700"
                        >
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                          <option value="Partial">Partial</option>
                        </select>
                      );
                    })()}
                  </td>

                  <td className="px-1 action_column">
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          if (
                            parseFloat(dt.total_amount) -
                              parseFloat(dt.main_amount) <=
                            0
                          )
                            return;
                          setSelectedPayment(dt);
                          setShowModal(true);
                          reset({
                            due_amount: dt.total_amount - dt.main_amount,
                            main_amount: dt.main_amount,
                            // note: dt.item_name,
                          });
                        }}
                        className={`px-1 py-1 rounded shadow-md transition-all cursor-pointer ${
                          parseFloat(dt.total_amount) -
                            parseFloat(dt.main_amount) >
                          0
                            ? "text-primary hover:bg-primary hover:text-white"
                            : "text-green-700 bg-gray-200 cursor-not-allowed"
                        }`}
                        disabled={
                          parseFloat(dt.total_amount) -
                            parseFloat(dt.main_amount) <=
                          0
                        }
                      >
                        {parseFloat(dt.total_amount) -
                          parseFloat(dt.main_amount) >
                        0
                          ? "Pay Now"
                          : "Complete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal start */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 z-50  flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-[#11375B]">
              Update Payment
            </h2>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                  name="due_amount"
                  label="Due Amount"
                  required
                  readOnly
                />
                <InputField name="main_amount" label="Pay Amount" required />
                <InputField name="note" label="Note" required />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 px-4 rounded mt-4 hover:bg-primary hover:text-white cursor-pointer transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <BtnSubmit>Submit</BtnSubmit>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
      {/* modal end */}
    </div>
  );
};

export default PaymentList;
