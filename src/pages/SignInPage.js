import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import InputForm from "../components/input/InputForm";
import InputPassword from "../components/input/InputPassword";
import Label from "../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { toast } from "react-toastify";
import Logo from "../components/logo/Logo";

const initialValue = {
  email: "",
  password: "",
};

const schema = yup.object({
  email: yup
    .string()
    .email("This is a email field!!")
    .required("This is a required field!!"),
  password: yup
    .string()
    .required("This is a required field!!")
    .max(20, "This field must be less than or equal to 20")
    .min(6, "This field must be greater than or equal to 6"),
});
const SignInPage = () => {
  useEffect(() => {
    document.title = "Sign In";
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

  const handleSubmitSignIn = async (values) => {
    if (!isValid) return null;

    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast.success("Sign In Successful!!!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="max-w-[300px] sm:max-w-[500px] xl:max-w-[700px] mx-auto"
      onSubmit={handleSubmit(handleSubmitSignIn)}
    >
      <Logo className="mt-10 text-3xl text-center"></Logo>
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
      <Button type="submit" className="w-full !p-2 mt-4 !text-lg">
        Sign In
      </Button>
      <div className="mt-4">
        You don't have an account?{" "}
        <Link to="/sign-up" className="text-green-600">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignInPage;
