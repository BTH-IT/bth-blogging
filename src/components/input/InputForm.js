import React from "react";
import { useController } from "react-hook-form";

const InputForm = ({ name = "", children, control, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });
  return (
    <div>
      <div className="relative">
        <input
          {...field}
          {...props}
          id={name}
          value={field.value || ""}
          className={`w-full h-full pl-3 py-3 pr-10 text-lg transition-all border border-gray-200 rounded-md outline-none focus:border-green-500`}
        />
        {children}
      </div>
      {error?.message ? (
        <span className="text-sm text-red-500">{error.message}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputForm;
