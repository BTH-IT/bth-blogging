import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import ModalContent from "../components/modal/ModalContent";
import PostAdminManage from "../components/post/PostAdminManage";
import Table from "../components/table/Table";
import { db } from "../firebase/firebase-config";

const ManagePosts = () => {
  useEffect(() => {
    document.title = "Admin manage user posts";
  }, []);
  const [postList, setPostList] = useState([]);
  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  useEffect(() => {
    async function fetchPosts() {
      const colRef = collection(db, "posts");

      onSnapshot(colRef, (querySnapshot) => {
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
    fetchPosts();
  }, []);

  const handleDelete = async (e) => {
    if (e.target.getAttribute("data-value").toLowerCase() === "yes") {
      try {
        await deleteDoc(doc(db, "posts", idDelete));
        toast.success("Delete your post successfull!!!");
      } catch (error) {
        toast.error(error.message);
      }
    }
    setShow(false);
  };

  return (
    <>
      <Table
        heading={
          <tr>
            <th>Id</th>
            <th>Thumb</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Status</th>
            <th>Detail</th>
            <th>Remove</th>
          </tr>
        }
      >
        {postList.length > 0 &&
          postList.map((post) => (
            <PostAdminManage
              key={post.postId}
              title={post.title}
              postId={post.postId}
              thumb={post.thumb}
              thumbName={post.thumbName}
              date={moment(post.createdAt.seconds * 1000).format("L")}
              author={post.author}
              status={post.status}
              handleDelete={() => {
                setIdDelete(post.postId);
                setShow(true);
              }}
            ></PostAdminManage>
          ))}
      </Table>
      {show ? (
        <Modal onClick={() => setShow(false)}>
          <ModalContent title="ARE YOU SURE???">
            <div className="flex items-center justify-around mt-5">
              <div
                onClick={handleDelete}
                data-value="Yes"
                className="px-3 py-1 text-green-400 transition-all bg-white border border-green-400 rounded-md cursor-pointer hover:text-white hover:bg-green-400"
              >
                Yes
              </div>
              <div
                data-value="No"
                onClick={handleDelete}
                className="px-3 py-1 text-white transition-all bg-green-400 border border-green-400 rounded-md cursor-pointer hover:bg-white hover:text-green-400"
              >
                No
              </div>
            </div>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};

export default ManagePosts;
