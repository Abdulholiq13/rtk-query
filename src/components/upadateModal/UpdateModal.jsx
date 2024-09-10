import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { useEffect } from "react";

const UpdateModal = ({ children, close }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [close]);
  return (
    <div className="fixed top-0 left-0 w-full h-screen">
      <div onClick={close} className="fixed top-0 left-0 w-full h-screen bg-[#00000050] z-30"></div>
      <div className="p-5 w-[400px] rounded-lg bg-yellow-300 z-50 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <div className="">
          <button onClick={close} className="border-none bg-transparent ml-auto block text-3xl mb-3">
            <FaWindowClose className="text-red-400" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default UpdateModal;
