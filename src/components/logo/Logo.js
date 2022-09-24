import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ children = "Hung Blogging", className }) => {
  return (
    <Link
      to="/"
      className={`${className} block text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-semibold text-green-500`}
    >
      {children}
    </Link>
  );
};

export default Logo;
