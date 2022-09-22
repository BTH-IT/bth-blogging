import React from "react";
import { Link } from "react-router-dom";

const NavProfile = ({ user }) => {
  return (
    <Link
      to="/profile"
      className="flex items-center justify-between p-1 mr-2 border border-green-400 cursor-pointer lg:p-2 lg:mr-4 rounded-3xl hover:brightness-110"
    >
      <div className="w-4 h-4 rounded-lg sm:w-6 sm:h-6">
        <img
          src={user.photoURL}
          alt=""
          className="object-cover w-full h-full rounded-full"
        />
      </div>
      <h1 className="flex items-center ml-2 text-sm text-green-500 lg:ml-4 lg:text-lg">
        {user.displayName}
      </h1>
    </Link>
  );
};

export default NavProfile;
