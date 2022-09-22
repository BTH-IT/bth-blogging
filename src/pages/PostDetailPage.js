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
            className="w-full p-2 mr-4 text-sm text-center text-green-500 transition-all bg-white border border-green-500 rounded-3xl text-md hover:bg-green-500 hover:text-white"
          >
            Create a post
          </Link>
        )}
      </NavManage>
      <DetailPost postId={postId}></DetailPost>
    </div>
  );
};

export default PostDetailPage;
