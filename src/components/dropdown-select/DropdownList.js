import React from "react";
import Portal from "../portal/Portal";

const DropdownList = ({ coords, children }) => {
  if (typeof document === "undefined") return null;
  return (
    <Portal parentContainer={document.querySelector("body")}>
      <div
        className="absolute left-0 w-full max-h-[200px] overflow-y-auto py-2 bg-white border border-green-500 rounded-lg top-full"
        style={{
          left: coords.left,
          top: coords.top + coords.height + window.scrollY + 10,
          width: coords.width,
        }}
      >
        {children}
      </div>
    </Portal>
  );
};

export default DropdownList;
