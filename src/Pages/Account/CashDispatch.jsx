import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaPen, FaTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { HiCurrencyBangladeshi } from "react-icons/hi2";
import { Link } from "react-router-dom";
import BtnCmn from "../../components/Button/BtnCmn";

const CashDispatch = () => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch office data
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_API}/account/list`)
      .then((response) => {
        if (response.data.status === "Success") {
          const data = response.data.data;
          setAccount(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching account data:", error);
        setLoading(false);
      });
  }, []);
  // pagination
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCash = account.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(account.length / itemsPerPage);
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
  if (loading) return <p className="text-center mt-16">Loading...</p>;
  return (
    <div className="bg-gradient-to-br from-gray-100 to-white md:p-4">
      <div className="w-xs md:w-full overflow-hidden overflow-x-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-2 py-10 md:p-6 border border-gray-200">
        <div className="md:flex items-center justify-between mb-6">
          <h1 className="text-xl font-extrabold text-secondary flex items-center gap-3">
            <HiCurrencyBangladeshi className="text-2xl" />
            Fund Transfer
          </h1>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Link to="/account/CashDispatchForm">
              <BtnCmn>
                <FaPlus /> Dispatch
              </BtnCmn>
            </Link>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-secondary capitalize">
              <tr>
                <th className="p-2">SL</th>
                <th className="p-2">Date</th>
                <th className="p-2">Branch</th>
                <th className="p-2">PersonName</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Bank Name</th>
                <th className="p-2">Ref</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-secondary font-semibold bg-gray-100">
              {currentCash?.map((dt, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-all border border-gray-200"
                >
                  <td className="p-2 font-bold">{indexOfFirstItem + i + 1}</td>
                  <td className="p-2">{dt.date}</td>
                  <td className="p-2">{dt.branch}</td>
                  <td className="p-2">{dt.person_name}</td>
                  <td className="p-2">{dt.type}</td>
                  <td className="p-2">{dt.amount}</td>
                  <td className="p-2">{dt.bank_name}</td>
                  <td className="p-2">{dt.ref}</td>
                  <td className="p-2 action_column">
                    <div className="flex gap-1">
                      <Link>
                        <button className="text-secondary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                          <FaPen className="text-[12px]" />
                        </button>
                      </Link>
                      <button className="text-secondary hover:bg-primary hover:text-white px-2 py-1 rounded shadow-md transition-all cursor-pointer">
                        <FaEye className="text-[12px]" />
                      </button>
                      <button className="text-red-900 hover:text-white hover:bg-red-900 px-2 py-1 rounded shadow-md transition-all cursor-pointer">
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
                    ? "bg-primary text-white hover:bg-gray-200 hover:text-secondary transition-all duration-300 cursor-pointer"
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
    </div>
  );
};

export default CashDispatch;
