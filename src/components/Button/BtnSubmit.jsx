const BtnSubmit = ({ children }) => {
  return (
    <div className="w-full flex justify-end">
      <button
        type="submit"
        className="bg-gradient-to-r from-[#2d0577] to-[#5654d8] hover:from-blue-700 hover:to-blue-900 text-white px-4 py-1 rounded-md shadow-lg gap-2 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        {children}
      </button>
    </div>
  );
};

export default BtnSubmit;
