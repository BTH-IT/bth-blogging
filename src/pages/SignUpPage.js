import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import InputForm from "../components/input/InputForm";
import InputPassword from "../components/input/InputPassword";
import Label from "../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth, db } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { ROLE_USER } from "../utils/contains";
import Logo from "../components/logo/Logo";

const initialValue = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const schema = yup.object({
  username: yup
    .string()
    .required("This is a required field!!")
    .max(10, "This field must be less than or equal to 10"),
  email: yup
    .string()
    .email("This is a email field!!")
    .required("This is a required field!!"),
  password: yup
    .string()
    .required("This is a required field!!")
    .max(20, "This field must be less than or equal to 20")
    .min(6, "This field must be greater than or equal to 6"),
  confirmPassword: yup
    .string()
    .required("This is a required field!!")
    .max(20, "This field must be less than or equal to 20")
    .min(6, "This field must be greater than or equal to 6")
    .oneOf([yup.ref("password"), null], "passwords don't match!!!"),
});

const SignUpPage = () => {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleSubmitting = async (values) => {
    if (!isValid) return null;

    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);

      await updateProfile(auth.currentUser, {
        displayName: values.username,
        photoURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU",
      });

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        username: values.username,
        email: values.email,
        password: values.password,
        role: ROLE_USER.USER,
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU",
        createdAt: serverTimestamp(),
      });

      toast.success("Create your account successfulf!!!", {
        pauseOnHover: true,
        closeOnClick: true,
      });

      navigate("/");
    } catch (error) {
      toast.error(error.message, {
        pauseOnHover: true,
        closeOnClick: true,
      });
    }
  };
  return (
    <form
      className="max-w-[300px] sm:max-w-[500px] xl:max-w-[700px] mx-auto"
      onSubmit={handleSubmit(handleSubmitting)}
    >
      <Logo className="mt-10 text-3xl text-center"></Logo>
      <div>
        <Label name="username">Username</Label>
        <InputForm
          type="text"
          name="username"
          placeholder="Enter your username"
          control={control}
        ></InputForm>
      </div>
      <div>
        <Label name="email">Email Address</Label>
        <InputForm
          type="email"
          name="email"
          placeholder="Enter your email"
          control={control}
        ></InputForm>
      </div>
      <InputPassword
        label="Password"
        name="password"
        placeholder="Enter your password"
        control={control}
      ></InputPassword>
      <InputPassword
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Enter your confirm password"
        control={control}
      ></InputPassword>
      <Button type="submit" className="w-full !p-2 mt-4 !text-lg">
        Sign Up
      </Button>
      <div className="mt-4">
        You have an account?{" "}
        <Link to="/sign-in" className="text-green-600">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignUpPage;
