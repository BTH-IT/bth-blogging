import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavManage from "../components/navigate/NavManage";
import DetailPost from "../components/post/DetailPost";
import { useAuth } from "../contexts/auth-context";
import { ROLE_USER } from "../utils/contains";

const PostDetailPage = () => {
  const { user } = useAuth();
  const { postId } = useParams();
  useEffect(() => {
    document.title = "Detail post";
  }, []);
  return (
    <div className="container">
      <NavManage>
        {user.role === ROLE_USER.ADMIN ? (
          <Link
            to="/admin-dashboard"
            className="p-1 mr-2 font-medium text-green-500 border border-green-400 cursor-pointer lg:p-2 lg:mr-4 rounded-3xl hover:brightness-110"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/create-post"
            className="w-full p-1 mr-2 text-xs text-center text-green-500 transition-all bg-white border border-green-500 sm:p-2 sm:mr-4 sm:text-sm rounded-3xl hover:bg-green-500 hover:text-white"
          >
            Create post
          </Link>
        )}
      </NavManage>
      <DetailPost postId={postId}></DetailPost>
    </div>
  );
};

export default PostDetailPage;
