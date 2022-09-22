import React from "react";
import InputForm from "./InputForm";

const InputWithIcon = ({ children = null, className = "", ...props }) => {
  return <InputForm {...props}>{children}</InputForm>;
};

export default InputWithIcon;
