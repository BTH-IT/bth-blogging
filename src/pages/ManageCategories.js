import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../components/button/Button";
import Category from "../components/category/Category";
import InputForm from "../components/input/InputForm";
import Label from "../components/label/Label";
import Modal from "../components/modal/Modal";
import { db } from "../firebase/firebase-config";
import * as yup from "yup";
import { useAuth } from "../contexts/auth-context";
import { ROLE_USER } from "../utils/contains";
import { useNavigate } from "react-router-dom";
import Table from "../components/table/Table";
import ModalContent from "../components/modal/ModalContent";

const schema = yup.object({
  name: yup.string().required("This is a required field!!").max(10),
});

const ManageCategories = () => {
  useEffect(() => {
    document.title = "Admin manage categories";
  }, []);
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });
  const [show, setShow] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [idSelect, setIdSelect] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleSelectRemove = (categoryId) => {
    setShow(true);
    setIdSelect(categoryId);
  };

  const handleSelectUpdate = async (categoryId, name) => {
    reset({
      name,
    });
    setShowUpdate(true);
    setIdSelect(categoryId);
  };

  useEffect(() => {
    try {
      const colRef = collection(db, "categories");
      onSnapshot(colRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
            categoryId: doc.id,
          });
        });
        setCategories(result);
      });
    } catch (error) {}
  }, []);

  const handleDelete = async (e) => {
    if (e.target.getAttribute("data-value").toLowerCase() === "yes") {
      try {
        await deleteDoc(doc(db, "categories", idSelect));
        toast.success("Delete category successfull!!!");
      } catch (error) {
        toast.error(error.message);
      }
    }
    setShow(false);
  };

  const handleCreateCategory = async (values) => {
    if (!isValid) return;

    try {
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...values,
        createdAt: serverTimestamp(),
      });
      toast.success("Creat successfull!!");
      setShowCreate(false);
      reset({
        name: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateCategory = async (values) => {
    if (!isValid) return;

    try {
      const docRef = doc(db, "categories", idSelect);
      await updateDoc(docRef, {
        ...values,
        createdAt: serverTimestamp(),
      });
      toast.success("Creat successfull!!");
      setShowUpdate(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
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
            <th>Name</th>
            <th>Date</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        }
      >
        {categories.length > 0 &&
          categories.map((category) => (
            <Category
              key={category.categoryId}
              id={category.categoryId}
              name={category.name}
              date={moment(category.createdAt?.seconds * 1000).format("L")}
              handleRemove={() => handleSelectRemove(category.categoryId)}
              handleUpdate={() =>
                handleSelectUpdate(category.categoryId, category.name)
              }
            ></Category>
          ))}
      </Table>
      <div className="text-center">
        <span
          onClick={() => {
            reset({
              name: "",
            });
            setShowCreate(true);
          }}
          className="inline-block p-3 mt-10 font-semibold text-green-500 transition-all border border-green-300 rounded-lg cursor-pointer hover:text-white hover:bg-green-500"
        >
          Create a new category
        </span>
      </div>
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
      {showCreate ? (
        <Modal className="w-[470px]" onClick={() => setShowCreate(false)}>
          <ModalContent title="Create new category">
            <form onSubmit={handleSubmit(handleCreateCategory)}>
              <div>
                <Label name="name">Category Name</Label>
                <InputForm
                  name="name"
                  control={control}
                  placeholder="Enter category name..."
                ></InputForm>
              </div>
              <Button type="submit" className="w-full mt-5">
                Create
              </Button>
            </form>
          </ModalContent>
        </Modal>
      ) : null}
      {showUpdate ? (
        <Modal className="w-[470px]" onClick={() => setShowCreate(false)}>
          <ModalContent title="Update a category">
            <form onSubmit={handleSubmit(handleUpdateCategory)}>
              <div>
                <Label name="name">Category Name</Label>
                <InputForm
                  name="name"
                  control={control}
                  placeholder="Enter category name..."
                ></InputForm>
              </div>
              <Button type="submit" className="w-full mt-5">
                Update
              </Button>
            </form>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};

export default ManageCategories;
