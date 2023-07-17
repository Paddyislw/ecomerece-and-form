import React, { useRef, useState } from "react";
import File from "../static/icons/File.png";
import Spinner from "../global/Spinner";
import SuccessModal from "./SuccessModal";
import { toast } from "react-toastify";
import { ReactComponent as Email } from "../static/svg/email.svg";

const SettingCard = () => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const fileRef = useRef(null);
  //const [jsonFile, setJsonFile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", file: null });
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);
  const handleFileUpload = () => {
    fileRef.current.click();
  };

  const handleJSONfileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    setLoading(true);
    reader.onload = () => {
      try {
        const content = JSON.stringify(JSON.parse(reader.result));
        //  setJsonFile(content);
        setForm((prev) => ({ ...prev, file: content }));
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  const submitHandler = () => {
    if (form.name && emailRegex.test(form.email) && form.file) {
      setSubmit(true);
    } else {
      if (!emailRegex.test(form.email) && form.name !== "") {
        toast.error("Please Enter a valid email");
      } else {
        toast.error("Please fill all fields");
      }
    }
  };


  return (
    <div className="w-[360px] mx-auto  mt-10">
      <div className="my-4">
        <p className="font-semibold">Full Name</p>
        <input
          type="text"
          placeholder="Full Name"
          className="bg-gray-100 p-2 rounded-lg w-full focus:outline-none"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          value={form.name}
        />
      </div>
      <div className="my-4">
        <p className="font-semibold">Email</p>
        <div className="flex bg-gray-100 items-center p-2 rounded-lg">
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            className="bg-gray-100 rounded-lg w-full focus:outline-none"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            value={form.email}
          />
          <Email className="text-gray-500 w-6" />
        </div>
      </div>
      <div className="my-4">
        <p className="font-semibold">Upload JSON File</p>
        <div>
          <div className="bg-gray-100 cursor-pointer flex justify-center items-center rounded-xl mt-2 border w-full border-dashed py-6">
            {!loading && (
              <div className="" onClick={handleFileUpload}>
                <img src={File} alt="" className="mx-auto" />
                <p className="text-gray-500 text-sm text-center">Browse File</p>
              </div>
            )}
            {loading && (
              <div className="flex justify-center items-center h-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-900"></div>
              </div>
            )}
          </div>
          <input
            type="file"
            className="w-full focus:outline-none"
            accept=".json  "
            onChange={(e) => {
              handleJSONfileUpload(e);
              e.target.value = null;
            }}
            style={{ display: "none" }}
            ref={fileRef}
          />
        </div>
      </div>
      <div className="my-4">
        <p className="font-semibold">File Contents</p>
        {form.file ? (
          <div className="w-full border bg-gray-100 rounded-lg p-2 max-h-[200px] min-h-[100px] overflow-scroll scrollbar-hide">
            {form.file}
          </div>
        ) : (
          <div className="w-full h-[100px] bg-gray-100 rounded-lg"></div>
        )}
      </div>
      <button
        className="w-full bg-[#3062C8] text-white font-semibold p-3 rounded-3xl"
        onClick={submitHandler}
      >
        Submit
      </button>
      {submit && (
        <SuccessModal
          setSubmit={setSubmit}
          setForm={setForm}
          fileRef={fileRef}
        />
      )}
    </div>
  );
};

export default SettingCard;
