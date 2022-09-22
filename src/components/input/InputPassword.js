import React, { useState } from "react";
import Label from "../label/Label";
import InputWithEyeClose from "./InputWithEyeClose";
import InputWithEyeOpen from "./InputWithEyeOpen";

const InputPassword = ({ label = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickEyeIcon = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <Label name={props.name}>{label}</Label>
      {showPassword ? (
        <InputWithEyeOpen
          {...props}
          onClick={handleClickEyeIcon}
        ></InputWithEyeOpen>
      ) : (
        <InputWithEyeClose
          {...props}
          onClick={handleClickEyeIcon}
        ></InputWithEyeClose>
      )}
    </div>
  );
};

export default InputPassword;
