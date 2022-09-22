import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../../firebase/firebase-config";
import parse from "html-react-parser";
import Post from "./Post";
import { useNavigate } from "react-router-dom";
import { STATUS_POST } from "../../utils/contains";

const DetailPost = ({ postId }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPostList, setRelatedPostList] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const docRef = doc(db, "posts", postId);
        const docSnap = await getDoc(docRef);
        setPost({
          ...docSnap.data(),
          postId,
        });
      } catch (error) {}
    }

    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  useEffect(() => {
    async function fetchRelatedPost() {
      try {
        let result = [];
        const q = query(
          collection(db, "posts"),
          where("status", "==", STATUS_POST.PUBLIC)
        );
        const docSnaps = await getDocs(q);

        docSnaps.forEach((doc) => {
          result.push({
            ...doc.data(),
            postId: doc.id,
          });
        });
        result = result.filter((relatedPost) => postId !== relatedPost.postId);
        result = result.filter((relatedPost) => {
          const isRelated = relatedPost.categories.some((relatedCategory) => {
            return post?.categories.some(
              (category) => relatedCategory.name === category.name
            );
          });
          return isRelated;
        });
        if (result.length > 3) {
          setRelatedPostList([result[0], result[1], result[2]]);
        } else setRelatedPostList(result);
      } catch (error) {}
    }

    fetchRelatedPost();
  }, [post?.categories, postId]);

  const handleClickPost = (postId) => {
    navigate(`/detail-post/${postId}`);
  };

  if (!post) return;
  return (
    <div className="max-w-[1180px] mx-auto w-full p-2 xl:p-0">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="w-full h-[200px] sm:h-[300px] xl:h-[400px] rounded-xl">
          <img
            src={post.thumb}
            alt={post.thumbName}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex gap-x-2">
            {post.categories?.length > 0 &&
              post.categories?.map((category) => (
                <span
                  key={category.categoryId}
                  className="p-2 text-xs font-semibold text-center rounded-xl bg-category text-categoryText"
                >
                  {category.name}
                </span>
              ))}
          </div>
          <h1 className="my-2 text-3xl font-medium text-green-500 sm:my-4 sm:text-4xl 2xl:text-5xl">
            {post.title}
          </h1>
          <div className="text-xs text-gray-400 sm:text-sm xl:text-base">
            {moment(post.createdAt.seconds * 1000).format("MMM Do YY")} -{" "}
            {post.author}
          </div>
        </div>
      </div>
      <div className="max-w-[820px] mx-auto w-full my-10">
        {parse(post.content)}
      </div>
      <div className="mb-10">
        <h1 className="my-5 text-2xl font-medium text-green-400">
          Related Posts
        </h1>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {relatedPostList.length > 0 &&
            relatedPostList.map((relatedPost) => {
              return (
                <Post
                  key={relatedPost.postId}
                  categories={relatedPost.categories}
                  time={moment(relatedPost.createdAt.seconds * 1000).fromNow()}
                  author={relatedPost.author}
                  title={relatedPost.title}
                  thumb={relatedPost.thumb}
                  alt={relatedPost.thumbName}
                  onClick={() => handleClickPost(relatedPost.postId)}
                ></Post>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
