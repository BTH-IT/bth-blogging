import React from "react";

const Icon = ({ className = "", children, onClick = () => {} }) => {
  return (
    <span
      className={`${className} absolute -translate-y-1/2 top-1/2 right-4 sm:right-2`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Icon;
