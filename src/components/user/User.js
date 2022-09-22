import React from "react";
import Role from "./Role";

const User = ({
  id,
  avatar,
  avatarName,
  date,
  email,
  role,
  username,
  handleChangeRole,
  handleRemove,
}) => {
  return (
    <tr className="hover:bg-gray-100">
      <td>{id}</td>
      <td className="flex justify-center">
        <div className="w-[75px] h-[75px]">
          <img
            src={avatar}
            alt={avatarName}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
      </td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{date}</td>
      <td>
        <div className="flex flex-col items-center">
          <Role role={role} handleChangeRole={handleChangeRole}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </span>
          </Role>
        </div>
      </td>
      <td>
        <div className="flex justify-center">
          <span
            onClick={handleRemove}
            className="transition-all cursor-pointer hover:text-green-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
        </div>
      </td>
    </tr>
  );
};

export default User;
