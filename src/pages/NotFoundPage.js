import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-4xl font-bold text-center text-green-500">
      OOPS!!! NOT FOUND PAGE {":<"}
      <Link
        to="/"
        className="p-3 mt-4 font-medium text-white bg-green-500 rounded-md text-md hover:brightness-110"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
