import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import Button from "../button/Button";
import NavProfile from "./NavProfile";

const NavSign = ({ user, children }) => {
  const navigate = useNavigate();
  const handleClickSignUp = () => {
    navigate("/sign-up");
  };

  const handleClickSignOut = () => {
    signOut(auth);
    navigate("/");
  };
  if (user) {
    return (
      <div className="flex items-center justify-between">
        <NavProfile user={user}></NavProfile>
        {children}
        <Button onClick={handleClickSignOut} className="flex-shrink-0">
          Sign Out
        </Button>
      </div>
    );
  }
  return <Button onClick={handleClickSignUp}>Sign Up</Button>;
};

export default NavSign;
