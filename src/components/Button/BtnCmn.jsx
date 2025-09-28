const BtnCmn = ({ children }) => {
  return (
    <button
      type="submit"
      className="bg-gradient-to-r from-[#055f77] to-[#012b36] hover:from-[#055f77] hover:to-[#012b36] text-white px-4 py-1 rounded-md shadow-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
    >
      {children}
    </button>
  );
};

export default BtnCmn;
