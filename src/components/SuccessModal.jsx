import React from "react";
import Success from "../static/icons/Success.png";

const SuccessModal = ({ setSubmit, setForm ,fileRef}) => {
  const clickHandler = () => {
    setSubmit(false);
    setForm({ name: "", email: "", file: null });

  };
  return (
    <div className="h-[100vh] w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-xl w-[350px] flex flex-col items-center px-3 py-10 space-y-4">
        <img src={Success} alt="" className="object-contain" />
        <p>Successfully Uploaded</p>
        <button
          className="w-full bg-[#3062C8] py-3 text-white font-semibold rounded-3xl"
          onClick={clickHandler}
        >
          Go to My Entries
        </button>
        <button
          className="w-full bg-[#E9F0FF] py-3 text-[#3062C8] font-semibold rounded-3xl"
          onClick={clickHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
