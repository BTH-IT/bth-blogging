import React from "react";
import { ROLE_USER } from "../../utils/contains";

const Role = ({ role, handleChangeRole }) => {
  switch (role) {
    case ROLE_USER.ADMIN:
      return (
        <span
          onClick={handleChangeRole}
          className="px-3 py-1 font-medium text-red-500 bg-red-200 border border-red-500 cursor-pointer rounded-3xl"
        >
          Admin
        </span>
      );
    case ROLE_USER.MOD:
      return (
        <span
          onClick={handleChangeRole}
          className="px-3 py-1 font-medium text-purple-500 bg-purple-200 border border-purple-500 cursor-pointer rounded-3xl"
        >
          Mod
        </span>
      );
    case ROLE_USER.USER:
      return (
        <span
          onClick={handleChangeRole}
          className="px-3 py-1 font-medium text-blue-500 bg-blue-200 border border-blue-500 cursor-pointer rounded-3xl"
        >
          User
        </span>
      );
    default:
      return (
        <span
          onClick={handleChangeRole}
          className="px-3 py-1 font-medium text-yellow-500 bg-yellow-200 border border-yellow-500 cursor-pointer rounded-3xl"
        >
          Banned
        </span>
      );
  }
};

export default Role;
