import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="relative z-50 min-h-[200px] bg-white max-w-[80%] m-auto p-4">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className=" text-2xl" />
            </div>
            {children}
          </div>
          <div
            onClose={onClose}
            className="absolute z-40 backdrop-blur inset-0"
          />
        </>
      )}
    </>
  );
};

export default Modal;
