import React from "react";

const Button = ({
  type = "button",
  className = "",
  children,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} text-white text-sm md:text-base xl:text-lg bg-green-500 rounded-md p-1 sm:p-2 hover:brightness-110`}
    >
      {children}
    </button>
  );
};

export default Button;
