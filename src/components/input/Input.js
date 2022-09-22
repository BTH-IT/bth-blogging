import React from "react";

const Input = ({ children = null, className = "", name = "", ...props }) => {
  return (
    <div className={`relative ${className} h-full`}>
      <input
        {...props}
        name={name}
        id={name}
        className={`w-full h-full pl-2 py-2 pr-8 text-base lg:text-lg transition-all border border-gray-200 rounded-md outline-none focus:border-green-500`}
      />
      {children}
    </div>
  );
};

export default Input;
