const BtnSubmit = ({ children }) => {
  return (
    <div className="w-full flex justify-end">
      <button
        type="submit"
        className="bg-gradient-to-r from-[#055f77] to-[#012b36] hover:from-[#055f77] hover:to-[#012b36] text-white px-4 py-1 rounded-md shadow-lg gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {children}
      </button>
    </div>
  );
};

export default BtnSubmit;
