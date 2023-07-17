import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
    </div>
  );
};

export default Spinner;
