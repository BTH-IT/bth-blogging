import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavManage from "../components/navigate/NavManage";
import { useAuth } from "../contexts/auth-context";
import ManagePosts from "./ManagePosts";

const ModManagePage = () => {
  useEffect(() => {
    document.title = "Mod manage user posts";
  }, []);
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  if (!userInfo) {
    navigate("/");
    return;
  }
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
      <ManagePosts></ManagePosts>
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

export default ModManagePage;
