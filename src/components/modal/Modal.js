import React from "react";
import Portal from "../portal/Portal";

const Modal = ({ children, onClick, className }) => {
  if (typeof document === "undefined") return null;
  return (
    <Portal parentContainer={document.querySelector("body")}>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full">
        <div
          className={`${className} relative p-4 bg-white border border-green-500 rounded-lg`}
        >
          {children}
          <div
            onClick={onClick}
            className="cursor-pointer absolute z-11 -top-[30px] -right-[30px] transition-all text-white hover:text-green-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full bg-black opacity-50"></div>
    </Portal>
  );
};

export default Modal;
