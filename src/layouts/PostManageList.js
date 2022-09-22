import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostManage from "../components/post/PostManage";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase/firebase-config";
import moment from "moment";
import Modal from "../components/modal/Modal";
import { toast } from "react-toastify";
import Table from "../components/table/Table";
import ModalContent from "../components/modal/ModalContent";

const PostManageList = () => {
  const [postList, setPostList] = useState([]);
  const [show, setShow] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const { userInfo } = useAuth();

  useEffect(() => {
    async function fetchPosts() {
      const result = [];
      const q = query(
        collection(db, "posts"),
        where("userId", "==", userInfo?.uid)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        result.push({
          ...doc.data(),
          postId: doc.id,
        });
      });
      setPostList(result);
    }
    if (userInfo.uid) fetchPosts();
  }, [userInfo.uid]);

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
            <th>Date</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        }
      >
        {postList.length > 0 &&
          postList.map((post) => (
            <PostManage
              key={post.postId}
              title={post.title}
              postId={post.postId}
              userId={post.userId}
              thumb={post.thumb}
              thumbName={post.thumbName}
              date={moment(new Date(post.createdAt.seconds * 1000)).format("l")}
              handleDelete={() => {
                setIdDelete(post.postId);
                setShow(true);
              }}
            ></PostManage>
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

export default PostManageList;
