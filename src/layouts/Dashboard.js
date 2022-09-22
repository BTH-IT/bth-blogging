import { signOut } from "firebase/auth";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import { auth } from "../firebase/firebase-config";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleClickSignOut = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div className="flex items-center justify-between p-1 border-b-2 border-gray-200">
      <h1 className="text-xl font-semibold text-green-500">Dashboard</h1>
      <div className="hidden sm:flex">
        <NavLink to="/admin-dashboard/users" className="nav_dashboard">
          Users
        </NavLink>
        <NavLink to="/admin-dashboard/categories" className="nav_dashboard">
          Categories
        </NavLink>
        <NavLink to="/admin-dashboard/blogs" className="nav_dashboard">
          Blogs
        </NavLink>
      </div>
      <div>
        <Link
          to="/"
          className="hidden p-2 mr-4 font-semibold text-green-500 transition-all border border-green-300 rounded-lg sm:inline-block hover:text-white hover:bg-green-500"
        >
          Back to Home
        </Link>
        <Button onClick={handleClickSignOut}>Sign Out</Button>
      </div>
    </div>
  );
};

export default Dashboard;
