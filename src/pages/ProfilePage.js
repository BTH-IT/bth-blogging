import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import ImageUpload from "../components/imageUpload/ImageUpload";
import InputForm from "../components/input/InputForm";
import Label from "../components/label/Label";
import { useAuth } from "../contexts/auth-context";
import * as yup from "yup";
import { auth, db } from "../firebase/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useUploadFile from "../hooks/useUploadFile";
import { updateProfile } from "firebase/auth";
import { ROLE_USER } from "../utils/contains";
import Logo from "../components/logo/Logo";

const schema = yup.object({
  username: yup
    .string()
    .required("This is a required field!!")
    .max(10, "This field must be less than or equal to 10"),
});

const ProfilePage = () => {
  const { userInfo, user } = useAuth();
  useEffect(() => {
    document.title = "Profile";
  }, []);
  const {
    control,
    handleSubmit,
    formState: { isValid },
    setValue,
    getValues,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      avatar: "",
      avatarName: "",
    },
    resolver: yupResolver(schema),
  });
  const { url, name, setName, setUrl, handleSelectImage, deleteImage } =
    useUploadFile(getValues, setValue);

  useEffect(() => {
    reset({
      username: user.username,
      avatar: user.avatar,
      avatarName: user.avatarName,
    });

    setUrl(getValues("avatar"));
    setName(getValues("avatarName"));
  }, [
    getValues,
    reset,
    setName,
    setUrl,
    user.avatar,
    user.avatarName,
    user.username,
  ]);

  const handleSave = async (values) => {
    if (!isValid) return;
    const docRef = doc(db, "users", userInfo.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.data().avatarName !== name)
      deleteImage(docSnap.data().avatarName);
    await updateDoc(docRef, {
      ...docSnap.data(),
      ...values,
      avatarName: name,
    });
    await updateProfile(auth.currentUser, {
      displayName: values.username,
      photoURL: values.avatar,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="flex flex-col items-center justify-center h-screen max-w-[500px] mx-auto p-2 sm:p-0"
    >
      <Logo></Logo>
      <ImageUpload
        className="w-40 h-40 mb-10 rounded-full cursor-pointer"
        name="avatar"
        handleChange={(e) => {
          handleSelectImage(e.target.files[0], "avatar");
        }}
        url={url}
      ></ImageUpload>

      <div className="w-full">
        <Label name="username">Username</Label>
        <InputForm
          type="text"
          name="username"
          placeholder="Enter your username"
          control={control}
        ></InputForm>
      </div>

      <Button type="submit" className="w-full !p-2 mt-4 !text-lg">
        Update
      </Button>
      <Link
        to="/manage-posts"
        className="w-full p-3 mt-4 text-base text-center text-green-500 transition-all bg-white border border-green-500 rounded-md text-md hover:bg-green-500 hover:text-white"
      >
        Manage your posts
      </Link>
      {user.role === ROLE_USER.ADMIN ? (
        <Link
          to="/admin-dashboard"
          className="w-full p-3 mt-4 text-base text-center text-green-500 transition-all bg-white border border-green-500 rounded-md text-md hover:bg-green-500 hover:text-white"
        >
          Dashboard
        </Link>
      ) : null}
      {user.role === ROLE_USER.MOD ? (
        <Link
          to="/mod-manage-posts"
          className="w-full p-3 mt-4 text-base text-center text-green-500 transition-all bg-white border border-green-500 rounded-md text-md hover:bg-green-500 hover:text-white"
        >
          Manage user posts
        </Link>
      ) : null}
    </form>
  );
};

export default ProfilePage;
