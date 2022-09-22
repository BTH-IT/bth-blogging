import React from "react";
import Logo from "../logo/Logo";

const NavHeader = ({ className, children }) => {
  return (
    <div
      className={`flex items-center justify-between p-1 sm:p-2 mb-4 sm:mb-8 ${className}`}
    >
      <Logo></Logo>
      {children}
    </div>
  );
};

export default NavHeader;
