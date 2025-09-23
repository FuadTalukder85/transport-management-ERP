import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaUsers } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const Customer = () => {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  // delete modal
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const toggleModal = () => setIsOpen(!isOpen);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch customer data
  useEffect(() => {
    axios
      .get("https://api.tramessy.com/mstrading/api/customer/list")
      .then((response) => {
        if (response.data.status === "Success") {
          setCustomer(response.data.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
        setLoading(false);
      });
  }, []);
  // delete by id
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://api.tramessy.com/mstrading/api/customer/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete customer data");
      }
      // Remove office data from local list
      setCustomer((prev) => prev.filter((customer) => customer.id !== id));
      toast.success("Customer data deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsOpen(false);
      setSelectedCustomerId(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("There was a problem deleting!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  if (loading) return <p className="text-center mt-16">Loading customer...</p>;
  // pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomer = customer.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(customer.length / itemsPerPage);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((currentPage) => currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages)
      setCurrentPage((currentPage) => currentPage + 1);
  };
  const handlePageClick = (number) => {
    setCurrentPage(number);
  };
  return (
    <main className="bg-gradient-to-br from-gray-100 to-white md:p-6">
      <Toaster />
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-8 border border-gray-200">
        {/* Header */}
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-[#11375B] flex items-center gap-3">
            <FaUsers className="text-[#11375B] text-2xl" />
            All Customer information
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/AddCustomer">
              <button className="bg-gradient-to-r from-[#11375B] to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
                <FaPlus /> Add Customer
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#11375B] text-white capitalize text-sm">
              <tr>
                <th className="p-2">SL.</th>
                <th className="p-2">Name</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Email</th>
                <th className="p-2">Address</th>
                <th className="p-2">DueBalance</th>
                <th className="p-2">Status</th>
                <th className="p-2 action_column">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#11375B] font-semibold bg-gray-100">
              {currentCustomer?.map((dt, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-all border border-gray-200"
                >
                  <td className="p-2 font-bold">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="p-2">{dt.customer_name}</td>
                  <td className="p-2">{dt.mobile}</td>
                  <td className="p-2">{dt.email}</td>
                  <td className="p-2">{dt.address}</td>
                  <td className="p-2">{dt.due}</td>
                  <td className="p-2">{dt.status}</td>
                  <td className="px-2 action_column">
                    <div className="flex gap-1">
                      <Link to={`/UpdateCustomerForm/${dt.id}`}>
                        <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaPen className="text-[12px]" />
                        </button>
                      </Link>
                      {/* <button className="text-primary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaEye className="text-[12px]" />
                      </button> */}
                      <button
                        onClick={() => {
                          setSelectedCustomerId(dt.id);
                          setIsOpen(true);
                        }}
                        className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer"
                      >
                        <FaTrashAlt className="text-[12px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="mt-10 flex justify-center">
          <div className="space-x-2 flex items-center">
            <button
              onClick={handlePrevPage}
              className={`p-2 ${
                currentPage === 1 ? "bg-gray-300" : "bg-primary text-white"
              } rounded-sm`}
              disabled={currentPage === 1}
            >
              <GrFormPrevious />
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => handlePageClick(number + 1)}
                className={`px-3 py-1 rounded-sm ${
                  currentPage === number + 1
                    ? "bg-primary text-white hover:bg-gray-200 hover:text-primary transition-all duration-300 cursor-pointer"
                    : "bg-gray-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className={`p-2 ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-primary text-white"
              } rounded-sm`}
              disabled={currentPage === totalPages}
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      <div className="flex justify-center items-center">
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#000000ad] z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-72 max-w-sm border border-gray-300">
              <button
                onClick={toggleModal}
                className="text-2xl absolute top-2 right-2 text-white bg-red-500 hover:bg-red-700 cursor-pointer rounded-sm"
              >
                <IoMdClose />
              </button>
              <div className="flex justify-center mb-4 text-red-500 text-4xl">
                <FaTrashAlt />
              </div>
              <p className="text-center text-gray-700 font-medium mb-6">
                Are you sure you want to delete this Customer?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={toggleModal}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-primary hover:text-white cursor-pointer"
                >
                  No
                </button>
                <button
                  onClick={() => handleDelete(selectedCustomerId)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Customer;
