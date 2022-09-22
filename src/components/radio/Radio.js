import React from "react";
import { useController } from "react-hook-form";
import Label from "../label/Label";

const Radio = ({ setValue, name, value, label, checked }) => {
  const handleClick = (e) => {
    setValue("status", e.target.value);
  };
  return (
    <div>
      <input
        type="radio"
        value={value}
        id={value}
        name={name}
        checked={checked}
        onChange={handleClick}
        hidden
      />
      <Label
        name={name}
        id={value}
        className="flex items-center cursor-pointer label-radio"
      >
        <div className="flex items-center justify-center w-5 h-5 mr-4 border border-black rounded-full">
          <div className="w-3 h-3 bg-blue-400 rounded-full input-check"></div>
        </div>
        {label}
      </Label>
    </div>
  );
};

export default Radio;
