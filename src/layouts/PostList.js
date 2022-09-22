import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "../components/post/Post";
import { db } from "../firebase/firebase-config";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { STATUS_POST } from "../utils/contains";

const PostList = ({ search }) => {
  const navigate = useNavigate();
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      const q = search
        ? query(
            collection(db, "posts"),
            where("title", ">=", search),
            where("title", "<=", search + "\uf8ff"),
            where("status", "==", STATUS_POST.PUBLIC)
          )
        : query(
            collection(db, "posts"),
            where("status", "==", STATUS_POST.PUBLIC)
          );
      onSnapshot(q, (querySnapshot) => {
        const result = [];
        querySnapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            postId: doc.id,
          });
        });
        setPostList(result);
      });
    }
    fetchPostList();
  }, [search]);

  const handleClickPost = (postId) => {
    navigate(`/detail-post/${postId}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {postList.length > 0 &&
        postList.map((post) => {
          return (
            <Post
              key={post.postId}
              categories={post.categories}
              time={moment(post.createdAt.seconds * 1000).fromNow()}
              author={post.author}
              title={post.title}
              thumb={post.thumb}
              alt={post.thumbName}
              onClick={() => handleClickPost(post.postId)}
            ></Post>
          );
        })}
    </div>
  );
};

export default PostList;
