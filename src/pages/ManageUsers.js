import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/modal/Modal";
import ModalContent from "../components/modal/ModalContent";
import Table from "../components/table/Table";
import User from "../components/user/User";
import { useAuth } from "../contexts/auth-context";
import { db } from "../firebase/firebase-config";
import { ROLE_USER } from "../utils/contains";
import { Auth, getAuth } from "firebase/auth";

const ManageUsers = () => {
  useEffect(() => {
    document.title = "Admin manage users";
  }, []);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showRole, setShowRole] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [idSelect, setIdSelect] = useState("");
  const [userList, setUserList] = useState([]);
  const handleChangeRole = (userId) => {
    setShowRole(true);
    setIdSelect(userId);
  };

  const handleClickRemove = (userId) => {
    setShowRemove(true);
    setIdSelect(userId);
  };

  const handleSelectRole = async (e) => {
    try {
      const docRef = doc(db, "users", idSelect);
      await updateDoc(docRef, {
        role: e.target.getAttribute("data-role"),
      });
      toast.success("Update role successfull!!!");
      setShowRole(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (e) => {
    if (e.target.getAttribute("data-value").toLowerCase() === "yes") {
      toast.warning(
        "This feature can't work yet due to firebase limitation!!!"
      );
    }
    setShowRemove(false);
  };

  useEffect(() => {
    try {
      const colRef = collection(db, "users");
      onSnapshot(colRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            userId: doc.id,
          });
        });
        setUserList(result);
      });
    } catch (error) {}
  }, []);

  if (user.role !== ROLE_USER.ADMIN) {
    navigate("/");
    return;
  }

  return (
    <>
      <Table
        heading={
          <tr>
            <th>Id</th>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Date</th>
            <th>Role</th>
            <th>Remove</th>
          </tr>
        }
      >
        {userList.length > 0 &&
          userList.map((user) => (
            <User
              key={user.userId}
              id={user.userId}
              avatar={user.avatar}
              avatarName={user.avatarName}
              date={moment(user.createdAt.seconds * 1000).format("L")}
              email={user.email}
              role={user.role}
              username={user.username}
              handleChangeRole={() => handleChangeRole(user.userId)}
              handleRemove={() => handleClickRemove(user.userId)}
            ></User>
          ))}
      </Table>
      {showRole ? (
        <Modal onClick={() => setShowRole(false)}>
          <ModalContent title="Change role">
            <div className="flex items-center mt-5 gap-x-5">
              <div
                onClick={handleSelectRole}
                data-role={ROLE_USER.ADMIN}
                className="px-3 py-1 font-medium text-red-500 bg-red-200 border border-red-500 cursor-pointer rounded-3xl"
              >
                Admin
              </div>
              <div
                data-role={ROLE_USER.MOD}
                onClick={handleSelectRole}
                className="px-3 py-1 font-medium text-purple-500 bg-purple-200 border border-purple-500 cursor-pointer rounded-3xl"
              >
                Mod
              </div>
              <div
                data-role={ROLE_USER.USER}
                onClick={handleSelectRole}
                className="px-3 py-1 font-medium text-blue-500 bg-blue-200 border border-blue-500 cursor-pointer rounded-3xl"
              >
                User
              </div>
              <div
                data-role={ROLE_USER.BAN}
                onClick={handleSelectRole}
                className="px-3 py-1 font-medium text-yellow-500 bg-yellow-200 border border-yellow-500 cursor-pointer rounded-3xl"
              >
                Ban
              </div>
            </div>
          </ModalContent>
        </Modal>
      ) : null}
      {showRemove ? (
        <Modal onClick={() => setShowRemove(false)}>
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

export default ManageUsers;
