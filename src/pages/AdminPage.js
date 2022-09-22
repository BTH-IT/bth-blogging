import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import Dashboard from "../layouts/Dashboard";
import { ROLE_USER } from "../utils/contains";

const AdminPage = () => {
  useEffect(() => {
    document.title = "Admin";
  }, []);
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user.role !== ROLE_USER.ADMIN) {
    navigate("/");
    return;
  }
  return (
    <>
      <Dashboard></Dashboard>
      <div className="flex justify-center sm:hidden">
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
      <Outlet></Outlet>
      <div className="mt-10 text-center sm:hidden">
        <Link
          to="/"
          className="p-3 mr-4 font-semibold text-green-500 transition-all border border-green-300 rounded-lg hover:text-white hover:bg-green-500"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default AdminPage;
