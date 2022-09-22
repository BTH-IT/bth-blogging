import React from "react";

const Label = ({ className, children, name, id }) => {
  return (
    <label
      name={name}
      htmlFor={id || name}
      className={`${className} inline-block mt-4`}
    >
      {children}
    </label>
  );
};

export default Label;
