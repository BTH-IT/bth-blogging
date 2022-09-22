import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PostManageList from "../../layouts/PostManageList";
import NavManage from "../navigate/NavManage";

const ManageUserPosts = () => {
  useEffect(() => {
    document.title = "Manage your posts";
  }, []);
  return (
    <>
      <NavManage className="border-b border-gray-300">
        <Link
          to="/create-post"
          className="hidden w-full font-medium text-center text-green-500 transition-all bg-white border border-green-500 sm:block sm:mr-2 sm:p-2 sm:text-xs lg:p-3 lg:text-sm lg:mr-4 rounded-3xl hover:bg-green-500 hover:text-white"
        >
          Create a post
        </Link>
      </NavManage>

      <PostManageList></PostManageList>
      <div className="text-center">
        <Link
          to="/create-post"
          className="inline-block p-3 mx-auto mt-10 font-semibold text-green-500 transition-all border border-green-300 rounded-lg cursor-pointer sm:hidden hover:text-white hover:bg-green-500"
        >
          Create a post
        </Link>
      </div>
    </>
  );
};

export default ManageUserPosts;
